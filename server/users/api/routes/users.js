const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

// create a new user
router.post('/signUp', (req, res, next) => {
    let newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        role: req.body.role,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    // User.find({}).then(res1 => {console.log(res1)});

    newUser
        .save()
        .then( (result) => {
            res.status(200).json({
                message: 'user created successfully',
                user_id: newUser._id
            });
        })
        .catch((err) => {
            console.log("ERROR: can't sign up new user");
            res.status(500).json({
				error: err
			});
        });
});
  
// log in user
router.post('/logIn', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    User
        .find({email: email})
        .then( (result) => {
            result ?
                result[0].password === password ?
                    res.status(200).json({
                        user: result,
                    }) :
                    res.status(404).json({
                        message: 'wrong password'
                    })
                :res.status(404).json({
                    message: 'No user exist with the provided email'
                });
        })
        .catch( (err) => {
            console.log("ERROR: can't get user with email:" + email);
            res.status(500).json({
				error: err
			});
        });
});

module.exports = router;