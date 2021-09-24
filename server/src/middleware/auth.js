const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
	path: path.resolve(__dirname, '../config/.env'),
});

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// console.log(`User ${decoded.id} is authenticated`);
		const user = await User.findOne({
			_id: decoded.id,
		});
		if (!user) {
			res.status(400).json({
				message: 'User not Found',
			});
		}
		req.user = user;
		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Server Error',
		});
	}
};

module.exports = auth;
