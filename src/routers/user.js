const express = require('express');
const Mongoose = require('mongoose');
const User = require('../models/User');
const ConnectRequest = require('../models/ConnectRequest');
const router = express.Router();
const auth = require('../middleware/auth');
const validateUserID = require('../middleware/userValidation');
const multer = require('multer');
const sharp = require('sharp');
/**
 * @name signup
 * @desc Allows user to create a new account
 * @access public
 * @memberof user
 */
router.post('/signup', async (req, res) => {
	const user = new User(req.body);
	try {
		const token = await user.generateAuthToken();
		await user.save();
		res.status(201).json({
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		if (error.code === 11000) {
			return res.status(409).json({
				message: 'Email already taken',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name me
 * @desc Allows user to get his account info
 * @access private
 * @memberof user
 */
router.get('/me', auth, async (req, res) => {
	res.send(req.user);
});

/**
 * @name login
 * @desc Allows user to login and get an auth token
 * @access public
 * @memberof user
 */
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findByCredentials(email, password);

		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (error) {
		console.error(error.message);
		if (error.message === 'Unable to login') {
			return res.status(400).json({
				message: 'Unable to login - Wrong Credentials',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

//Setup multer upload properties

const upload = multer({
	limits: {
		fileSize: 3000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Please upload an image'));
		}
		cb(undefined, true);
	},
});

/**
 * @name /me/avatar
 * @desc Allows user to upload an avatar to account info
 * @access private
 * @memberof user
 */
router.post(
	'/me/avatar',
	auth,
	upload.single('avatar'),
	async (req, res) => {
		try {
			const avatarBuffer = await sharp(req.file.buffer)
				.resize({
					width: 400,
					height: 400,
				})
				.png()
				.toBuffer();
			req.user.avatar = avatarBuffer;
			console.log(req.user);
			await req.user.save();
			res.set('Content-Type', 'image/png');
			res.send(req.user.avatar);
		} catch (error) {
			console.error(error);

			res.status(500).json({
				message: 'Server error',
			});
		}
	},
	(error, req, res, next) => {
		res.status(400).json({
			message: error.message,
		});
	}
);

/**
 * @name /me/avatar
 * @desc Allows user to delete the avatar
 * @access private
 * @memberof user
 */
router.delete('/me/avatar', auth, async (req, res) => {
	try {
		req.user.avatar = undefined;
		await req.user.save();
		res.json({
			message: 'Avatar Deleted!',
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name /{user_id}/avatar
 * @desc Allows user to get another user's avatar
 * @access public
 * @memberof user
 */

router.get('/:user_id/avatar', async (req, res) => {
	try {
		const user_id = req.params.user_id;
		if (!Mongoose.Types.ObjectId.isValid(user_id)) {
			return res.status(400).json({
				message: 'Wrong UserID',
			});
		}
		const user = await User.findById(user_id);

		if (!user) {
			return res.status(400).json({
				message: 'User not Found',
			});
		}

		if (user.avatar === undefined) {
			return res.status(400).json({
				message: 'No Avatar has been uploaded',
			});
		}
		res.set('Content-Type', 'image/png');
		res.send(user.avatar);
	} catch (error) {
		console.error(error.name);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name POST /{user_id}/connect
 * @desc Creates a new connect request to a specified user
 * @access private
 * @memberof user
 */

router.post('/:user_id/connect', auth, validateUserID, async (req, res) => {
	try {
		const senderID = req.user.id;
		const receiverID = req.params.user_id;

		let connectRequest = await ConnectRequest.findOne({
			sender: senderID,
			receiver: receiverID,
		});

		if (connectRequest) {
			return res.status(400).json({
				message: 'Request already sent.',
			});
		}

		connectRequest = new ConnectRequest({
			sender: senderID,
			receiver: receiverID,
			status: 'Pending',
		});

		await connectRequest.save();

		res.status(201).json({
			message: 'Connect Request sent!',
			requestID: connectRequest._id,
		});
	} catch (error) {
		console.error(error.name);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});
module.exports = router;
