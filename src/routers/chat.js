const express = require('express');
const Chat = require('../models/Chat');
const User = require('../models/User');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

const router = express.Router();

/**
 * @name POST /
 * @desc Allows user to create a new conversation
 * @access private
 * @memberof chat
 */

router.post('/', auth, async (req, res) => {
	const userOneID = req.user.id;
	const { userTwoID } = req.body;

	if (!mongoose.isValidObjectId(userTwoID)) {
		return res.status(400).json({
			message: 'The user id is invalid.',
		});
	}
	const chat = new Chat({ userOneID, userTwoID });
});

module.exports = router;
