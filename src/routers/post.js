const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();

/**
 * @name /
 * @desc Allows an authenticated user to create a post
 * @access public
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
			user: req.user._id,
		});
		await post.save();

		res.status(201).send(post);
	} catch (error) {
		if (error.name === 'ValidationError') {
			return res.status(400).send({
				message: 'No post body provided.',
			});
		}
		res.status(500).send({
			message: 'Server Error',
		});
	}
});

module.exports = router;
