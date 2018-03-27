const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
var bcrypt = require('bcrypt');


// create a new user
router.post('/signup', (req, res, next) => {
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
                userId: newUser._id
            });
        })
        .catch((err) => {
            console.log("ERROR: can't sign up new user");
            res.status(500).json(err);
        });
});
  
// log in user
router.post('/login', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log("here1");
    User
        // .authenticate(email, password)
        // .then((result) => {
        //     console.log("here2");
        //     result ?
        //         console.log(result)
        //         :
        //         console.log("no result!?");
        // })
        // .catch( (err) => {
        //     console.log("here3");
        //     console.log("ERROR: can't get user with email:" + email);
        //     res.status(500).json({
        //         test: 'test!!',
        //         error: err
		// 	});
        // });


    
        .find({email: email})
        .then( (users) => {
            users ?
            bcrypt.compare(password, users[0].password)
                .then( (result) => {
                    if (result === true) {
                        res.status(200).json({
                            userId: users[0]._id,
                            message: "successfuly logged in user"
                        }) 
                    } else {
                        res.status(401).json({
                            message: 'wrong password'
                        });
                    }
                })
                .catch( (err) => {
                    res.status(500).json({
                        message: 'can not verify user'
                    });
                })
                :res.status(404).json({
                    message: 'No user exist with the provided email'
                });
        })
        .catch( (err) => {
            console.log("ERROR: can't get user with email:" + email);
            res.status(500).json({
                error: err,
                message: "can't get user with email:" + email
			});
        });
});

// // log out user - waiting for authentication
// router.post('/logout', (req, res, next) => {

// });

module.exports = router;