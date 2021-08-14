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

// postSchema.virtual("comments", {
//     ref: "Comment",
//     localField: _id,
//     foreignField: "creator"
// })
const Post = mongoose.model('Post', postSchema);

module.exports = Post;