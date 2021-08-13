const mongoose = require('mongoose');
const User = require('./User');

const Post = new mongoose.Schema({
	body: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: User,
	},
});

const post = mongoose.model('post', Post);

module.exports = post;
