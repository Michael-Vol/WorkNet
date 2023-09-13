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
		req.query.personalInfo
			? (selectFields = 'firstName lastName email workExperience education skills phoneNumber')
			: (selectFields = 'firstName lastName email avatar phoneNumber');

		const users = await User.find({}).select(selectFields);
		if (req.query.personalInfo) {
			users.forEach((user, index) => {
				//check if connected with user to allow private visibility
				const isFriend = req.user.friends.includes(user._id);

				user.workExperience = isFriend
					? user.workExperience.reverse()
					: user.workExperience.reverse().filter((work) => work.visible);
				user.education = isFriend
					? user.education.reverse()
					: user.education.reverse().filter((education) => education.visible);
				user.skills = isFriend ? user.skills.reverse() : user.skills.reverse().filter((skill) => skill.visible);
			});
		}

		res.json({ users });
	} catch (error) {
		console.log(error);
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
				switch (update) {
					case 'skills':
						fieldAllowedUpdates = ['name', 'visible'];
						break;
					case 'education':
						fieldAllowedUpdates = ['name', 'university', 'description', 'visible'];
						break;
					case 'workExperience':
						fieldAllowedUpdates = ['name', 'employer', 'description', 'visible'];
						break;
				}
				if (!fieldAllowedUpdates.includes(fieldUpdate)) {
					throw new Error({ name: 'Validation Error' });
				}
			});
		});
		userUpdates.forEach((update) => {
			req.user[update].push(req.body[update]);
		});
		await req.user.save();
		return res.json({ user: req.user });
	} catch (error) {
		console.log(error);
		if (error.name === 'ValidationError') {
			return res.status(400).json({
				message: 'One or more fields are missing or invalid',
			});
		}
		return res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET me/personal-info
 * @desc Allows user to get personalInfo
 * @access private
 * @memberof user
 */

router.get('/me/personal-info', auth, async (req, res) => {
	try {
		return res.json({
			workExperience: req.user.workExperience.reverse(),
			education: req.user.education.reverse(),
			skills: req.user.skills.reverse(),
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: 'Server Error',
		});
	}
});
/**
 * @name GET /:user_id/personal-info
 * @desc Allows to get another user's personalInfo
 * @access private
 * @memberof user
 */

router.get('/:user_id/personal-info', auth, async (req, res) => {
	try {
		const user = await User.findById(req.params.user_id);

		//check if connected with user to allow private visibility
		const isFriend = req.user.friends.includes(req.params.user_id);

		return res.json({
			firstName: user.firstName,
			lastName: user.lastName,
			workExperience: isFriend
				? user.workExperience.reverse()
				: user.workExperience.reverse().filter((work) => work.visible),
			education: isFriend ? user.education.reverse() : user.education.reverse().filter((education) => education.visible),
			skills: isFriend ? user.skills.reverse() : user.skills.reverse().filter((skill) => skill.visible),
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: 'Server Error',
		});
	}
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
    console.error(error);
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

		if (connectRequest && connectRequest.status === 'Pending') {
			return res.status(400).json({
				message: 'Request already sent',
			});
		}
		connectRequest = new ConnectRequest({
			sender: senderID,
			receiver: receiverID,
			status: 'Pending',
		});

		await connectRequest.save();

		res.status(201).json({
			request: connectRequest,
		});
	} catch (error) {
		console.error(error.name);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET
 * @desc Allows user to get all of his connected users
 * @access provate
 * @memberof user
 */

router.get('/me/connected_users', auth, async (req, res) => {
	try {
		const connectedUsers = await req.user
			.populate('friends', '_id firstName lastName email phoneNumber workExperience')
			.execPopulate();
		return res.json({ users: connectedUsers.friends });
	} catch (error) {
		console.error(error);
		return res.json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET /me/connect/pending?status=
 * @desc Allows user to get all of his connect requests
 * @access private
 * @memberof user
 */

router.get('/me/connect', auth, async (req, res) => {
	try {
		if (req.query.status) {
			const requests = await ConnectRequest.find({ receiver: req.user._id, status: req.query.status }).populate('sender');
			return res.json({
				requests,
			});
		} else {
			const requests = await ConnectRequest.find({ receiver: req.user._id }).populate('sender');

			return res.json({
				requests,
			});
		}
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
		if (req.query.accept === 'true') {
			connectRequest.status = 'Accepted';
			req.user.friends.push(senderID);
			const sender = await User.findById(senderID);
			sender.friends.push(req.user._id);

			await connectRequest.save();
			await req.user.save();
			await sender.save();
			return res.json({
				request: connectRequest,
			});
		} else {
			await connectRequest.remove();
			return res.json({
				message: 'Request Deleted',
			});
		}
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
		const connectRequest = await ConnectRequest.findOne({
			$or: [
				{ sender: senderID, receiver: receiverID },
				{ sender: receiverID, receiver: senderID },
			],
		});
		if (!connectRequest) {
			return res.json({
				message: 'No Connect Request exists or has already been deleted.',
				status: 'None',
			});
		}

		return res.json({
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

/**
 * @name GET /:user_id/friends
 * @desc Allows user to get all of the friends of another user
 * @access private
 * @memberof post
 */

router.get('/:user_id/friends', auth, async (req, res) => {
	try {
		let user = await User.findById(req.params.user_id);

		if (!user) {
			return res.status(400).json({
				message: 'No User found',
			});
		}
		//check if current user is friends with requested user to set friends visibility (except admin)
		const isFriend = req.user.isAdmin || req.user.friends.includes(req.params.user_id);

		if (!isFriend) {
			return res.json({
				friends: [],
			});
		}
		user = await user.populate('friends', '_id firstName lastName email phoneNumber').execPopulate();
		return res.json({ friends: user.friends });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
});

module.exports = router;
