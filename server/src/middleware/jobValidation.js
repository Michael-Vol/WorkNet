const express = require('express');
const Job = require('../models/Job');
const mongoose = require('mongoose');
const validateJobID = async (req, res, next) => {
	try {
		// Check if job ID is valid ObjectID
		const job_id = req.params.job_id;
		if (!mongoose.Types.ObjectId.isValid(job_id)) {
			return res.status(400).json({
				message: 'Invalid Job ID',
			});
		}

		//Check if job actually exists
		const job = await Job.findById(job_id);

		if (!job) {
			return res.status(400).json({
				message: "Job doesn't exist.",
			});
		}

		req.job = job;

		next();
	} catch (error) {
		console.error(error.name);
		res.status(500).json({
			message: 'Server Error',
		});
	}
};

module.exports = validateJobID;
