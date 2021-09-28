const mongoose = require('mongoose');
const Message = require('./Message');
const User = require('./User');
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
		lastMessage: {
			type: Object,
		},
	},
	{ timestamps: true }
);

chatSchema.virtual('messages', {
	ref: 'Message',
	localField: '_id',
	foreignField: 'chat',
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
