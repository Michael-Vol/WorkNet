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

//  na prostesoume auth otan ftiaxtei
router.get('/me', async(req, res) => {
    res.send(req.user)
})

// na prostesoume token pou tha dimiourgeitai otan sindethei
router.post("/login", async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router;