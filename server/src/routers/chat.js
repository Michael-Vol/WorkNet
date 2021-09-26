const express = require('express');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
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

		// check if user id is in request body
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

		// check if userTwoId belongs to an existing user
		const userTwo = await User.findById(userTwoID);
		if (!userTwo) {
			return res.status(400).json({
				message: 'The user does not exist',
			});
		}

		// Check if chat is already created
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
			chat_id: chat._id,
			user_id: user,
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
		let chats = await Chat.find({ $or: [{ userOne: req.user.id }, { userTwo: req.user.id }] });

		chats = await Promise.all(
			chats.map(async (chat) => {
				const fieldToPopulate = chat.userOne.equals(req.user.id) ? 'userTwo' : 'userOne';
				await chat.populate(fieldToPopulate).execPopulate();
				await chat.populate('messages').execPopulate();
				chat.messages.length > 0 ? (chat.lastMessage = chat.messages[chat.messages.length - 1]) : (chat.lastMessage = {});
				await chat.save();
				return chat;
			})
		);

		res.json({
			chats,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			message: 'Server Error',
		});
	}
});
/**
 * @name GET /{chat_id}
 * @desc retrieve the data of a  chat
 * @access private
 * @memberof chat
 */

router.get('/:chat_id', auth, async (req, res) => {
	try {
		const chat = await Chat.findOne({
			_id: req.params.chat_id,
			$or: [{ userOne: req.user.id }, { userTwo: req.user.id }],
		});
		if (!chat) {
			return res.status(400).json({
				message: 'Chat not found.',
			});
		}

		res.json({
			chat,
		});
	} catch (error) {
		console.error(error.name);
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: 'Chat not found.',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name DELETE /{chat_id}
 * @desc Deletes a specific chat
 * @access private
 * @memberof post
 */

router.delete('/:chat_id', auth, async (req, res) => {
	try {
		const chat = await Chat.findOne({
			_id: req.params.chat_id,
			$or: [{ userOne: req.user.id }, { userTwo: req.user.id }],
		});
		if (!chat) {
			return res.status(400).json({
				message: 'Chat not found.',
			});
		}
		await chat.remove();
		res.json({
			message: 'Chat Deleted',
		});
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: 'Chat not found.',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name POST /{chat_id}/messages
 * @desc Allows user to create a new post
 * @access private
 * @memberof chat
 */

router.post('/:chat_id/messages', auth, async (req, res) => {
	try {
		const chat = await Chat.findOne({
			_id: req.params.chat_id,
			$or: [{ userOne: req.user.id }, { userTwo: req.user.id }],
		});
		if (!chat) {
			return res.status(400).json({
				message: 'Chat not found.',
			});
		}
		const { body } = req.body;
		if (!body || body === '') {
			return res.status(400).json({
				message: 'No message body.',
			});
		}
		const message = new Message({
			chat: chat._id,
			sender: req.user.id,
			body,
		});

		await message.save();

		res.status(201).json({
			message,
		});
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: 'Chat not found.',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET /{chat_id}
 * @desc get a specified number of messages of a chat in descending order
 * @params limit = the number of messages to send back, skip = the number of
 * messages to skip
 * @access private
 * @memberof chat
 */

router.get('/:chat_id/messages', auth, async (req, res) => {
	try {
		const chat = await Chat.findOne({
			_id: req.params.chat_id,
			$or: [{ userOne: req.user.id }, { userTwo: req.user.id }],
		});
		if (!chat) {
			return res.status(400).json({
				message: 'Chat not found.',
			});
		}
		// Check for required query params
		const limit = req.query.limit === undefined ? 10 : parseInt(req.query.limit);
		const skip = req.query.skip === undefined ? 0 : parseInt(req.query.skip);
		const messages = Chat.aggregate([
			{
				$match: { _id: mongoose.Types.ObjectId(req.params.chat_id) },
			},
			{
				$lookup: {
					from: 'messages',
					localField: '_id',
					foreignField: 'chat',
					as: 'messages',
				},
			},
			{ $unwind: '$messages' },
			{
				$sort: { 'messages.createdAt': -1 },
			},
			{
				$skip: skip,
			},
			{
				$limit: limit,
			},
			{
				$sort: { 'messages.createdAt': 1 },
			},
		]).exec((error, chats) => {
			const selectedMessages = chats.map((chat) => chat.messages);
			res.json({
				messages: selectedMessages,
			});
		});
	} catch (error) {
		console.error(error);
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: 'Chat not found.',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

module.exports = router;
