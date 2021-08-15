const mongoose = require('mongoose');
const Chat = require('../models/Chat');
const messageSchema = new mongoose.Schema(
	{
		body: {
			type: String,
			required: true,
		},
		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chat',
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
