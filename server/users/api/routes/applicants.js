const express = require('express');
const router = express.Router();
const Applicant = require('../models/applicant');  

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
            console.log("ERROR: can't get all applicants")
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
            console.log("ERROR: can't get applicant with id:" + applicantId)
            res.status(500).json({
				error: err
			});
        });
});

// Not needed in this project scope.
// // update applicant by id
// router.put('/:applicantId', (args, res, next) => {
//     res.status(200).json({
//         message: 'get applicant with id',
//     });
// });

module.exports = router;