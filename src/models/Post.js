const mongoose = require('mongoose');

const Post = new mongoose.Schema({
	body: {
		type: String,
		required: [true, 'No Body'],
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
});

const post = mongoose.model('post', Post);

module.exports = post;
