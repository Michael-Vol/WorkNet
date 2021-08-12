const express = require('express');
const { Mongoose } = require('mongoose');
const User = require('../models/User');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/signup', async (req, res) => {
	const user = new User(req.body);
	try {
		const token = await user.generateAuthToken();
		await user.save();
		res.status(201).json({
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		if (error.code === 11000) {
			res.status(409).json({
				message: 'Email already taken',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});
// to problhma me to date htan to format sto aitima

//  na prostesoume auth otan ftiaxtei
router.get('/me', auth, async (req, res) => {
	res.send(req.user);
});

// na prostesoume token pou tha dimiourgeitai otan sindethei
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findByCredentials(email, password);

		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (error) {
		console.error(error.message);
		if (error.message === 'Unable to login') {
			return res.status(400).json({
				message: 'Unable to login - Wrong Credentials',
			});
		}
		res.status(500).json({
			message: 'Server Error',
		});
	}
});
module.exports = router;
