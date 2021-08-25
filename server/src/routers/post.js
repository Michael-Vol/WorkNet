const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
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
/**
 * @name POST /{post_id}/likes
 * @desc Allows user to like a specific post
 * @access private
 * @memberof post
 */

router.post('/:post_id/likes', auth, async (req, res) => {
	try {
		const postID = req.params.post_id;
		const userID = req.user.id;
		const post = await Post.findOne({
			_id: postID,
		});
		if (!post) {
			return res.status(400).json({
				message: 'No Post found.',
			});
		}
		//Check if post has already been liked
		const likeData = {
			post: postID,
			creator: userID,
		};
		let like = await Like.findOne(likeData);
		if (like) {
			return res.status(400).json({
				message: 'Post is already liked!',
			});
		}

		like = new Like(likeData);
		await like.save();
		res.status(201).json({
			message: 'Post Liked!',
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

/**
 * @name GET /{post_id}/likes
 * @desc Retrieves the number of likes of a specific post
 * @access public
 * @memberof post
 */

router.get('/:post_id/likes', async (req, res) => {
	try {
		const postID = req.params.post_id;
		const post = await Post.findOne({
			_id: postID,
		});
		if (!post) {
			return res.status(400).json({
				message: 'No Post found.',
			});
		}

		const likes = await Like.countDocuments({ post: postID });
		res.json({
			likes,
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

/**
 * @name DELETE /posts/{post_id}/likes
 * @desc Allows a user to unlike a post
 * @access private
 * @memberof post
 */

router.delete('/:post_id/likes', auth, async (req, res) => {
	try {
		const postID = req.params.post_id;
		const userID = req.user.id;
		const post = await Post.findOne({
			_id: postID,
		});
		if (!post) {
			return res.status(400).json({
				message: 'No Post found.',
			});
		}
		//Check if post has not been liked
		const likeData = {
			post: postID,
			creator: userID,
		};
		let like = await Like.findOne(likeData);
		if (!like) {
			return res.status(400).json({
				message: 'Post has not been liked.',
			});
		}
		await like.remove();
		res.json({
			message: 'Post Unliked!',
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
/**
 * @name POST /{post_id}/likes
 * @desc Allows user to like a specific post
 * @access private
 * @memberof post
 */
router.post('/:post_id/comments', auth, async (req, res) => {
	try {
		const { body } = req.body;
		const postID = req.params.post_id;
		const userID = req.user.id;
		const post = await Post.findOne({
			_id: postID,
		});

		if (!post) {
			return res.status(400).json({
				message: 'No Post Found',
			});
		}

		const comment = new Comment({
			body,
			post: postID,
			creator: userID,
		});

		await comment.save();
		res.status(201).json({
			message: 'Post Commented',
		});
	} catch (error) {
		console.error(error.name);
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: 'No Post found',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET /{post_id}/comments?limit=<value>&skip=<value2>
 * @desc Retrieves  comments of a specific post
 * @access public
 * @memberof post
 */
router.get('/:post_id/comments', auth, async (req, res) => {
	try {
		const postID = req.params.post_id;
		const post = await Post.findOne({
			_id: postID,
		});

		if (!post) {
			return res.status(400).json({
				message: 'No Post found.',
			});
		}
		const limit = req.query.limit === undefined ? 10 : parseInt(req.query.limit);
		const skip = req.query.skip === undefined ? 0 : parseInt(req.query.skip);
		console.log(limit, skip);

		await post
			.populate({
				path: 'comments',
				options: {
					limit,
					skip,
				},
			})
			.execPopulate();
		res.json({ comments: post.comments });
	} catch (error) {
		console.log(error);
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: 'No Comment found.',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name DELETE /{post_id}/comments?limit=<value>&skip=<value2>
 * @desc Delete a specific comment from a post
 * @access private
 * @memberof post
 */
router.delete('/:post_id/comments/:cmnt_id', auth, async (req, res) => {
	try {
		const postID = req.params.post_id;
		const userID = req.user.id;
		const commentID = req.params.cmnt_id;

		const post = await Post.findOne({
			_id: postID,
		});
		if (!post) {
			return res.status(400).json({
				message: 'No post found',
			});
		}
		// Check if comment exits
		const commentData = {
			_id: commentID,
			post: postID,
			creator: userID,
		};
		let comment = await Comment.findOne(commentData);

		if (!comment) {
			return res.status(400).json({
				message: 'Comment not found',
			});
		}
		await comment.remove();
		res.json({
			message: 'Comment Removed!',
		});
	} catch (error) {
		console.error(error.name);
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: 'Post not found',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name PATCH{post_id}/comments/:cmnt_id
 * @desc updating specific comment from a post
 * @access private
 * @memberof post
 */

router.patch('/:post_id/comments/:cmnt_id', auth, async (req, res) => {
	try {
		const postID = req.params.post_id;
		const userID = req.user.id;
		const commentID = req.params.cmnt_id;
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
			_id: postID,
		});
		if (!post) {
			return res.status(400).json({
				message: 'No post found',
			});
		}
		const commentData = {
			_id: commentID,
			post: postID,
			creator: userID,
		};
		let comment = await Comment.findOne(commentData);
		userUpdates.forEach((update) => {
			comment[update] = req.body[update];
		});
		await comment.save();
		res.json({
			comment,
		});
	} catch (error) {
		console.error(error.name);
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: 'No Comment found.',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

module.exports = router;