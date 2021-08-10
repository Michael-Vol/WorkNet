const express = require('express');
const { Mongoose } = require('mongoose');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
	try {
		const user = new User(req.body);
		// user.dateOfBirth = new Date(req.body.dateOfBirth)
		const token = user.generateAuthToken();
		res.status(201).json({
			user,
			token,
		});

		await user.save();
	} catch (error) {
		res.status(500).send(error);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

module.exports = router;
