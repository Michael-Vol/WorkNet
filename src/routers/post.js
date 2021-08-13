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

module.exports = router;
