const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();

/**
 * @name POST /
 * @desc Allows an authenticated user to create a post
 * @access private
 * @memberof post
 */

router.post('/', auth, async (req, res) => {
	try {
		const { body } = req.body;

		if (body == '') {
			return res.status(400).send({
				message: 'Cannot create an empty post.',
			});
		}

		const post = new Post({
			body,
			creator: req.user._id,
		});
		await post.save();

		res.status(201).send(post);
	} catch (error) {
		if (error.name === 'ValidationError') {
			return res.status(400).json({
				message: 'No post body provided.',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});
/**
 * @name GET /
 * @desc Allows user to get all of the posts
 * @access private
 * @memberof post
 */

router.get('/', auth, async (req, res) => {
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
 * @name GET /{post_id}
 * @desc Allows anyone to get any post
 * @access public
 * @memberof post
 */

router.get('/:post_id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res.status(400).json({
				message: 'Post not found.',
			});
		}
		res.json({
			post,
		});
	} catch (error) {
		console.error(error.name);
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: 'Post not found.',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name DELETE /post_id
 * @desc Delete a specific post
 * @access private
 * @memberof post
 */
router.delete('/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findOneAndRemove({ _id: req.params.post_id, creator: req.user._id });
		if (!post) {
			return res.status(400).json({
				message: 'No post found.',
			});
		}
		await post.remove();
		res.json({
			message: 'Post Deleted.',
		});
	} catch (error) {
		console.error(error.name);
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: 'Post not found.',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name PATCH /{post_id}
 * @desc Update a post of a user
 * @access private
 * @memberof post
 */

router.patch('/:post_id', auth, async (req, res) => {
	try {
		const allowedUpdates = ['body'];
		const userUpdates = Object.keys(req.body);
		userUpdates.forEach((update) => {
			if (!allowedUpdates.includes(update)) {
				return res.status(400).json({
					message: `Update: ${update} is invalid.`,
				});
			}
		});
		const post = await Post.findOne({
			_id: req.params.post_id,
			creator: req.user._id,
		});
		if (!post) {
			return res.status(400).json({
				message: 'No post found.',
			});
		}
		userUpdates.forEach((update) => {
			post[update] = req.body[update];
		});
		await post.save();
		res.json({
			post,
		});
	} catch (error) {
		console.error(error.name);
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: 'No Post found.',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});
module.exports = router;
