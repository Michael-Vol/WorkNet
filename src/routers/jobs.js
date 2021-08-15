const express = require('express');
const auth = require('../middleware/auth');
const Job = require('../models/Job');
const { body, validationResult } = require('express-validator');
const router = express.Router();

/**
 * @name POST /
 * @desc Allows user to post a new job
 * @access private
 * @memberof jobs
 */

router.post('/', auth, body('title').not().isEmpty(), body('body').not().isEmpty(), async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Errors found in request body fields',
			});
		}

		const { title, body } = req.body;

		const job = new Job({
			title,
			body,
			applicants: [],
			creator: req.user._id,
		});

		await job.save();

		res.status(201).json({
			message: 'Job Created!',
			job,
		});
	} catch (error) {
		console.error(error.name);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET /
 * @desc get all jobs created by the user authenticated
 * @access private
 * @memberof job
 */

router.get('/', auth, async (req, res) => {
	try {
		const jobs = await Job.find({ creator: req.user.id });

		res.json({
			jobs,
		});
	} catch (error) {
		console.error(error.name);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET /:job_id
 * @description Get a specific job
 * @access public
 * @memberof job
 */

router.get('/:job_id', async (req, res) => {
	try {
	} catch (error) {
		console.error(error.name);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

module.exports = router;
