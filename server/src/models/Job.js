const mongoose = require('mongoose');
const User = require('./User');
const jobSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	applicants: [
		{
			applicant: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		},
	],
	acceptedApplicant: {
		type: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
