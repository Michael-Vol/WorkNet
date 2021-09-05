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

router.post('/signup', upload.single('avatar'), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({
				message: 'Please upload an  avatar.',
			});
		}
		const avatarBuffer = await sharp(req.file.buffer)
			.resize({
				width: 400,
				height: 400,
			})
			.png()
			.toBuffer();
		console.log(req.body);
		const user = new User({ ...req.body, avatar: avatarBuffer });
		const token = await user.generateAuthToken();
		user.avatar = avatarBuffer;
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
			message: error.errors,
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
 * @name /
 * @descs Allows user to get all user info
 * @access private
 * @memberof user
 */

router.get('/', auth, async (req, res) => {
	try {
		const users = await User.find({}).select('firstName lastName email');
		res.json({ users });
	} catch (error) {
		res.status(500).json({
			message: error,
		});
	}
});

/**
 * @name POST me/
 * @desc Allows user to change email,password
 * @access private
 * @memberof user
 */

router.post('/me', auth, async (req, res) => {
	try {
		const allowedUpdates = ['email', 'password'];
		const userUpdates = Object.keys(req.body);

		//check if user updates are valid
		const isValidUpdate = userUpdates.every((update) => allowedUpdates.includes(update));
		if (!isValidUpdate) {
			return res.status(400).json({
				message: `Update is invalid.`,
			});
		}
		//Check if email is already taken (if email is in updates body)
		if (req.body.email) {
			const emailCount = await User.countDocuments({ _id: { $ne: req.user.id }, email: req.body.email });
			if (emailCount > 0) {
				return res.status(400).json({
					message: 'Email is already taken',
				});
			}
		}
		userUpdates.forEach((update) => {
			req.user[update] = req.body[update];
		});
		await req.user.save();
		return res.json({
			user: req.user,
		});
	} catch (error) {
		console.log(error);
		if (error.name === 'ValidationError') {
			return res.status(400).json({
				message: 'No body provided',
			});
		}
		return res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name POST me/personal-info
 * @desc Allows user set personalInfo
 * @access private
 * @memberof user
 */

router.post('/me/personal-info', auth, async (req, res) => {
	try {
		console.log(req.body);
		const allowedUpdates = ['workExperience', 'education', 'skills'];
		const userUpdates = Object.keys(req.body);
		userUpdates.forEach((update) => {
			if (!allowedUpdates.includes(update)) {
				return res.status(400).json({
					message: `Update: ${update} is  invalid.`,
				});
			}

			Object.keys(req.body[update]).forEach((fieldUpdate) => {
				let fieldAllowedUpdates = [];
				req.body[update] === 'skills'
					? (fieldAllowedUpdates = ['name'])
					: (fieldAllowedUpdates = ['name', 'description']);
				if (!fieldAllowedUpdates.includes(fieldUpdate)) {
					return res.status(400).json({
						message: `Update: ${fieldUpdate} is invalid.`,
					});
				}
			});
		});
		userUpdates.forEach((update) => {
			console.log(req.user[update]);
			req.user[update].push(req.body[update]);
		});
		await req.user.save();
		return res.json({ user: req.user });
	} catch (error) {
		console.log(error);
		if (error.name === 'ValidationError') {
			return res.status(400).json({
				message: 'No body provided',
			});
		}
		return res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET me/personal-info
 * @desc Allows user set personalInfo
 * @access private
 * @memberof user
 */

router.get('/me/personal-info', auth, async (req, res) => {
	return res.json({
		workExperience: req.user.workExperience,
		education: req.user.education,
		skills: req.user.skills,
	});
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
			return res.json({
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

/**
 * @name PATCH /{user_id}/connect
 * @desc Allows user to accept a connect request
 * @access private
 * @memberof user
 */

router.patch('/:user_id/connect', auth, validateUserID, async (req, res) => {
	try {
		const senderID = req.params.user_id;
		const receiverID = req.user.id;

		const connectRequest = await ConnectRequest.findOne({
			sender: senderID,
			receiver: receiverID,
		});
		if (!connectRequest) {
			return res.status(400).json({
				message: 'No Connect Request exists.',
			});
		} else if (connectRequest.status === 'Accepted') {
			return res.status(400).json({
				message: 'Connect Request has already been accepted',
			});
		}

		connectRequest.status = 'Accepted';
		await connectRequest.save();

		res.json({
			message: 'Connect Request Accepted',
			requestID: connectRequest._id,
		});
	} catch (error) {
		console.error(error.name);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name DELETE /{user_id}/connect
 * @desc Allows user to delete a connect request if it hasn't already been accepted
 * @access private
 * @memberof user
 */

router.delete('/:user_id/connect', auth, validateUserID, async (req, res) => {
	try {
		const senderID = req.user.id;
		const receiverID = req.params.user_id;

		let connectRequest = await ConnectRequest.findOne({
			sender: senderID,
			receiver: receiverID,
		});

		if (!connectRequest) {
			return res.status(400).json({
				message: 'No Connect Request exists or has already been deleted.',
			});
		} else if (connectRequest.status === 'Accepted') {
			return res.status(400).json({
				message: 'Connect Request has already been accepted',
			});
		}
		await connectRequest.remove();

		res.json({
			message: 'Connect Request deleted.',
		});
	} catch (error) {
		console.error(error.name);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET /{user_id}/connect/status
 * @desc Allows user to get the status of an existing connect request
 * @access private
 * @memberof user
 */

router.get('/:user_id/connect/status', auth, validateUserID, async (req, res) => {
	try {
		const senderID = req.user.id;
		const receiverID = req.params.user_id;

		let connectRequest = await ConnectRequest.findOne({
			sender: senderID,
			receiver: receiverID,
		});

		if (!connectRequest) {
			return res.status(400).json({
				message: 'No Connect Request exists or has already been deleted.',
			});
		}

		res.json({
			status: connectRequest.status,
			requestID: connectRequest._id,
		});
	} catch (error) {
		console.error(error.name);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET /me/posts
 * @desc Allows user to get all of the posts of his own
 * @access private
 * @memberof post
 */

router.get('/me/posts', auth, async (req, res) => {
	try {
		await req.user
			.populate({
				path: 'posts',
			})
			.execPopulate();
		res.json({
			posts: req.user.posts,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

module.exports = router;
