const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	body: {
		type: String,
		required: [true, 'No Body'],
	},
	creator: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
