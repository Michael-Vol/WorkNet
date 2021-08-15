const mongoose = require('mongoose');
const User = require('./User');
const ConnectRequestSchema = new mongoose.Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	receiver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
});

const ConnectRequest = mongoose.model('ConnectRequest', ConnectRequestSchema);

module.exports = ConnectRequest;
