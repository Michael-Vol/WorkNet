const mongoose = require('mongoose');
const Comment = require('./Comment');
const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			require: [true, 'No Title'],
		},
		body: {
			type: String,
			required: [true, 'No Body'],
		},
		creator: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

postSchema.virtual('comments', { ref: 'Comment', localField: '_id', foreignField: 'post' });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
