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
	try {
		const userOneID = req.user.id;
		const { user } = req.body;
		const userTwoID = user;

		//check if user id is in request body
		if (!userTwoID) {
			return res.status(400).json({
				message: 'No user id provided.',
			});
		}
		if (!mongoose.isValidObjectId(userTwoID)) {
			return res.status(400).json({
				message: 'The user id is invalid.',
			});
		}

		//check if userTwoId belongs to an existing user
		const userTwo = await User.findById(userTwoID);
		if (!userTwo) {
			return res.status(400).json({
				message: 'The user does not exist',
			});
		}

		//Check if chat is already created
		let chat = await Chat.findOne({ userOne: userOneID, userTwo: userTwoID });
		const reverseChat = await Chat.findOne({ userOne: userTwoID, userTwo: userOneID });
		if (chat || reverseChat) {
			return res.status(400).json({
				message: 'Chat already exists.',
			});
		}

		chat = new Chat({ userOne: userOneID, userTwo: userTwoID });

		await chat.save();

		res.status(201).json({
			message: 'Chat created.',
		});
	} catch (error) {
		console.error(error.name);

		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET /
 * @desc get all chats of a user
 * @access private
 * @memberof chat
 */

router.get('/', auth, async (req, res) => {
	try {
		const chats = await Chat.find({ $or: [{ userOne: req.user.id }, { userTwo: req.user.id }] });
		res.json({
			chats,
		});
	} catch (error) {
		console.error(error.name);

		res.status(500).json({
			message: 'Server Error',
		});
	}
});

module.exports = router;
