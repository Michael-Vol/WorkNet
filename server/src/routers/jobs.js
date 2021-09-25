const express = require('express');
const auth = require('../middleware/auth');
const Job = require('../models/Job');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const validateJobID = require('../middleware/jobValidation');

const router = express.Router();

/**
 * @name POST /
 * @desc Allows user to post a new job
 * @access private
 * @memberof jobs
 */

router.post(
	'/',
	auth,
	body('title').not().isEmpty(),
	body('body').not().isEmpty(),
	body('keywords').isArray(),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				console.log(errors);
				return res.status(400).json({
					errors: errors.array(),
					message: 'Errors found in request body fields',
				});
			}

			const { title, body, keywords } = req.body;

			const job = new Job({
				title,
				body,
				keywords,
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
	}
);

/**
 * @name GET /
 * @desc get all jobs created by the authenticated user
 * @access private
 * @memberof job
 */

router.get('/me', auth, async (req, res) => {
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
 * @name GET /
 * @desc get all jobs
 * @access private
 * @memberof job
 */

router.get('/', auth, async (req, res) => {
	try {
		const jobs = await Job.find({}).populate('creator').sort({ createdAt: -1 });

		return res.json({
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
 * @name PATCH /{job_id}
 * @desc apply for a specific job
 * @access private
 * @memberof job
 */

router.patch('/:job_id/apply', auth, async (req, res) => {
	try {
		const job = await Job.findOne({ _id: req.params.job_id, creator: { $ne: req.user._id } });

		if (!job) {
			return res.json({
				message: 'Job not found',
			});
		}

		if (job.applicants.includes(req.user._id)) {
			return res.status(400).json({
				message: 'Already applied to this job post',
			});
		}

		job.applicants.push(req.user._id);
		await job.save();
		return res.json({
			job,
		});
	} catch (error) {
		console.error(error.name);
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: 'Invalid ID',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name PATCH /{job_id}
 * @desc mark a job post as closed
 * @access private
 * @memberof job
 */

router.patch('/:job_id/close', auth, body('applicantId').not().isEmpty(), async (req, res) => {
	try {
		const { applicantId } = req.body;
		const job = await Job.findOne({
			creator: req.user._id,
			_id: req.params.job_id,
			open: true,
		});

		if (!job) {
			return res.status(400).json({
				message: 'Job not found',
			});
		}
		const applicant = await User.findById(applicantId);
		if (!applicant) {
			return res.status(400).json({
				message: 'Applicant not found.',
			});
		}

		job.acceptedApplicant = applicantId;
		job.open = false;
		await job.save();

		return res.json({
			job,
		});
	} catch (error) {
		console.error(error.name);
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: 'Invalid ID',
			});
		}
		return res.status(500).json({
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

router.get('/:job_id', validateJobID, async (req, res) => {
	try {
		//Job has already been found by job validation middleware
		res.json({
			job: req.job,
		});
	} catch (error) {
		console.error(error.name);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET /:job_id/check_application
 * @description Allows user to check if he has applied in a specific job post
 * @access private
 * @memberof job
 */
router.get('/:job_id/check_application', auth, async (req, res) => {
	try {
		const job = await Job.findOne({ _id: req.params.job_id, creator: { $ne: req.user._id } });
		if (!job) {
			return res.status(400).json({
				message: 'Job not found',
			});
		}

		const isApplicant = job.applicants.includes(req.user._id);

		return res.json({
			applied: isApplicant,
			job,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});
/**
 * @name DELETE /:job_id
 * @description Delete a specific job
 * @access private
 * @memberof job
 */

router.delete('/:job_id', auth, validateJobID, async (req, res) => {
	try {
		//Check if job creator is same as the authenticated user
		if (!req.job.creator.equals(req.user.id)) {
			return res.status(400).json({
				message: 'You are not authenticated to delete this job.',
			});
		}
		await req.job.remove();

		res.json({
			message: 'Job Deleted.',
		});
	} catch (error) {
		console.error(error.name);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

/**
 * @name GET /:job_id/applicants
 * @desc Allows user to get applicants of one of his job posts
 * @access private
 * @memberof job
 */

router.get('/:job_id/applicants', validateJobID, auth, async (req, res) => {
	try {
		//Check if job creator is same as the authenticated user
		if (!req.job.creator.equals(req.user.id)) {
			return res.status(400).json({
				message: 'You are not authenticated to get the applicants.',
			});
		}

		let applicants = [];
		if (req.job.applicants.length > 0 && req.job.open) {
			applicants = await Promise.all(
				req.job.applicants.map(async (applicantId) => {
					const applicant = await User.findById(applicantId);
					return applicant;
				})
			);
		}

		return res.json({
			applicants,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});
module.exports = router;
