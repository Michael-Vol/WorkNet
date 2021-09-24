const mongoose = require('mongoose');
const User = require('./User');
const jobSchema = new mongoose.Schema(
	{
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
		keywords: [
			{
				type: String,
			},
		],
		applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		acceptedApplicant: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		open: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
