const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		const token = user.generateAuthToken();
		res.status(201).json({
			user,
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

module.exports = router;
