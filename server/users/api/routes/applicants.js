const express = require('express');
const router = express.Router();
const Applicant = require('../models/applicant');  
const mongoose = require('mongoose');
// get all applicants
router.get('/', (req, res, next) => {
    Applicant
        .find({})
        .then( (result) => {
            result ?
                res.status(200).json({
                    applicants: result,
                }) :
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
        })
        .catch( (err) => {
            console.log("ERROR: can't get all applicants");
            res.status(500).json({
				error: err
			});
        });
});

// get applicant by id
router.get('/:applicantId', (req, res, next) => {
    let applicantId = req.params.applicantId;

    Applicant
        .findById(applicantId)
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
            console.log("ERROR: can't get applicant with id:" + applicantId);
            res.status(500).json({
				error: err
			});
        });
});

// update applicant by id
router.put('/:applicantId', (req, res, next) => {
    let applicantId = req.params.applicantId;
    fields = { status: req.body.status}

    Applicant
        .update({_id: applicantId}, {$set: fields}, {runValidators: true})
        .then( (result) => {
            res.status(200).json({
                message: 'Applicant status updated successfully',
                applicantId: applicantId,
                nModified: result.nModified
            });
        })
        .catch((err) => {
            console.log("ERROR: can't update applicant with id:" + applicantId);
            res.status(500).json({
				error: err
			});
        });
});

// temp method to add extra applicants (not in scope of project).
// router.post('/', (req, res, next) => {
//     let newUser = new Applicant({
//         _id: new mongoose.Types.ObjectId(),
//         email: req.body.email,
//         fname: req.body.fname,
//         lname: req.body.lname
//     });

//     newUser
//         .save()
//         .then( (result) => {
//             res.status(200).json({
//                 message: 'user created successfully',
//                 user_id: newUser._id
//             });
//         })
//         .catch((err) => {
//             console.log("ERROR: can't sign up new user");
//             res.status(500).json({
// 				error: err
// 			});
//         });
// });

module.exports = router;