const express = require('express');
const { Mongoose } = require('mongoose');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async(req, res) => {

    try {

        const user = new User(req.body);
        // user.dateOfBirth = new Date(req.body.dateOfBirth)
        const token = user.generateAuthToken();
        res.status(201).json({

            user,
            token
        });
        /* Unhandled promise pairnoume gia to save, epsaxa kai eida oti prepei na einai se try, catch block alla den doulepse. Se diko tou try and catch, an to baleis sto 
        hdh uparxon den tha doulespei kan to save */
        await user.save();

    } catch (error) {

        res.status(500).send(error)
        res.status(500).json({
            message: 'Server Error',
        });
    }
});



module.exports = router;