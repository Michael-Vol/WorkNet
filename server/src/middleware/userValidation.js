const User = require('../models/User');
const mongoose = require('mongoose');
const express = require('express');
const validateUserID = async (req, res, next) => {
	try {
		const user_id = req.params.user_id;
		//Check if user id is valid
		if (!mongoose.Types.ObjectId.isValid(user_id)) {
			return res.status(400).json({
				message: 'Wrong UserID',
			});
		}

		//Check if user exists
		const user = await User.findById(user_id);

		if (!user) {
			return res.status(400).json({
				message: 'User not Found',
			});
		}
		next();
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			message: 'Server Error',
		});
	}
};

module.exports = validateUserID;
