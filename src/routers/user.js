const express = require('express');
const { Mongoose } = require('mongoose');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async(req, res) => {
    try {
        const user = new User(req.body);
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
// to problhma me to date htan to format sto aitima
module.exports = router;