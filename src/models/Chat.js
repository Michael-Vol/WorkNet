const mongoose = require('mongoose');
const Message = require('./Message');
const chatSchema = new mongoose.Schema(
	{
		userOne: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		userTwo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Message',
			},
		],
	},
	{ timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
