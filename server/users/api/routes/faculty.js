const express = require('express');
const router = express.Router();
const User = require('../models/user');

// get all faculty
router.get('/', (req, res, next) => {
    User
        .find({role : 'Faculty'})
        .then( (result) => {
            result ?
                res.status(200).json({
                    faculty: result,
                }) :
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
        })
        .catch( (err) => {
            console.log("ERROR: can't get all faculty")
            res.status(500).json({
				error: err
			});
        });
});

// get faculty by id
router.get('/:facultyId', (req, res, next) => {
    let facultyId = req.params.facultyId;

    User
        .findById(facultyId)
        .then( (result) => {
            result ?
                res.status(200).json({
                    faculty: result,
                }) :
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
        })
        .catch( (err) => {
            console.log("ERROR: can't get faculty with id:" + facultyId)
            res.status(500).json({
				error: err
			});
        });
});
  
// update faculty by id
router.put('/:facultyId', (req, res, next) => {
    let facultyId = req.params.facultyId;
    let fields = {
        role: req.body.role,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };
    Object.keys(fields).forEach((key) => (fields[key] == null) && delete fields[key])

    User
        .update({_id: facultyId}, {$set: fields}, {runValidators: true})
        .then( (result) => {
            res.status(200).json({
                message: 'user updated successfully',
                facultyId: facultyId
            });
        })
        .catch((err) => {
            console.log("can't sign up new user")
            res.status(500).json({
				error: err
			});
        });
});
  

module.exports = router;