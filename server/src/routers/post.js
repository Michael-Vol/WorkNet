const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const ConnectRequest = require('../models/ConnectRequest');
const multer = require('multer');
const sharp = require('sharp');
const router = express.Router();
/**
 * @name POST /
 * @desc Allows an authenticated user to create a post
 * @access private
 * @memberof post
 */

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

router.post('/', auth, upload.single('image'), async (req, res) => {
	try {
		const { title, body } = req.body;
		console.log(req.body);
		if (body == '' || title == '') {
			return res.status(400).send({
				message: 'Cannot create an empty post.',
			});
		}

		const post = new Post({
			title,
			body,
			includesVideo: req.body.includesVideo,
			videoFileName: req.body.videoFileName,
			creator: req.user._id,
		});

		if (req.file) {
			const imageBuffer = await sharp(req.file.buffer)
				.resize({
					width: 600,
					height: 400,
				})
				.png()
				.toBuffer();
			post.image = imageBuffer;
		}
		await post.save();

		res.status(201).json({ post });
	} catch (error) {
		if (error.name === 'ValidationError') {
			return res.status(400).json({
				message: 'No post body provided.',
			});
		}
		return res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET /
 * @desc Allows user to get all of the posts
 * @access auth
 * @memberof post
 */

router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find({}).populate('creator').sort({ updatedAt: -1 });
		return res.json({ posts });
	} catch (error) {
		console.error(error.name);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET  /personalized
 * @desc Allows user to get only his personalized posts
 * @access auth
 * @memberof post
 */

router.get('/personalized', auth, async (req, res) => {
	try {
		//get user-created posts
		let posts = [];
		const myPosts = await Post.find({ creator: req.user._id })
			.populate('creator', '_id firstName lastName email phoneNumber')
			.sort({ updatedAt: -1 });

		posts.push(...myPosts);
		//get friends' posts
		await Promise.all(
			req.user.friends.map(async (friendId, index) => {
				const friendPosts = await Post.find({ creator: friendId })
					.populate('creator', '_id firstName lastName email phoneNumber')
					.sort({ updatedAt: -1 });
				posts.push(...friendPosts);

				//get posts of non connected users that friends have liked

				const likes = await Like.find({ creator: friendId });
				const likedPostIds = likes.map((like) => like.post);

				const likedPosts = await Promise.all(
					likedPostIds.map(async (postId) => {
						const post = await Post.findById(postId)
							.populate('creator', '_id firstName lastName email phoneNumber')
							.sort({ updatedAt: -1 });
						return post;
					})
				);
				posts.push(...likedPosts);
				return posts;
			})
		);
		//Remove Duplicates from posts array
		posts = posts.reduce((unique, value) => {
			if (!unique.some((post) => post._id.equals(value._id))) {
				unique.push(value);
			}
			return unique;
		}, []);
		posts = posts.sort((postA, postB) => (postB.createdAt > postA.createdAt ? 1 : -1));

		res.json({ posts });
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
			await like.remove();
			return res.json({
				message: 'Post unliked!',
				liked: false,
			});
		}

		like = new Like(likeData);
		await like.save();
		res.status(201).json({
			message: 'Post Liked!',
			liked: true,
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
 * @desc Retrieves the likes of a specific post
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

		const likes = await Like.find({ post: postID }).populate('creator', '_id firstName lastName email phoneNumber');
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
 * @name GET /{post_id}/liked
 * @desc Allows user to check if he has liked a post
 * @access private
 * @memberof post
 */

router.get('/:post_id/liked', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		if (!post) {
			return res.status(400).json({
				message: 'No Post found.',
			});
		}

		const like = await Like.findOne({
			post: post._id,
			creator: req.user._id,
		});

		if (!like) {
			return res.json({
				liked: false,
			});
		}

		return res.json({
			liked: true,
		});
	} catch (error) {
		console.error(error);

		return res.json({
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
 * @name POST /{post_id}/comments
 * @desc Allows user to comment a specific post
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
		const sort = { updatedAt: -1 };
		await post
			.populate({
				path: 'comments',
				populate: { path: 'creator', model: 'User' },
				options: {
					limit,
					skip,
					sort,
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

/**
 * @name GET /reactions
 * @desc Allows user to get the reactions(likes,comments) to  his posts
 */

router.get('/all/reactions', auth, async (req, res) => {
	try {
		let likes = [];
		let comments = [];
		const options = { read: false };

		const posts = await Post.find({ creator: req.user._id });

		await Promise.all(
			posts.map(async (post) => {
				const postLikes = await Like.find({ post: post._id, ...options })
					.populate('creator')
					.sort({ updatedAt: -1 });
				const postComments = await Comment.find({ post: post._id, ...options })
					.populate('creator')
					.sort({ updatedAt: -1 });

				likes.push(...postLikes);
				comments.push(...postComments);
			})
		);

		return res.json({
			likes,
			comments,
		});
	} catch (error) {
		console.error(error);
		if ((error.name = 'CastError')) {
			return res.status(400).json({
				message: 'Invalid Post ID',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name POST /reactions/${reaction_id}/read
 * @desc Allows user to mark a reaction(like or comment) as read
 * @access private
 * @memberof post
 */

router.post('/reactions/:reaction_id/read', auth, async (req, res) => {
	try {
		const like = await Like.findById(req.params.reaction_id);
		if (!like) {
			const comment = await Comment.findById(req.params.reaction_id);

			if (!comment) {
				return res.status(400).json({
					message: 'Reaction Not found',
				});
			}

			comment.read = true;
			await comment.save();

			return res.json({
				comment,
			});
		}

		like.read = true;
		await like.save();
		return res.json({
			like,
		});
	} catch (error) {
		console.error(error);
		if ((error.name = 'CastError')) {
			return res.status(400).json({
				message: 'Invalid ID',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

module.exports = router;
