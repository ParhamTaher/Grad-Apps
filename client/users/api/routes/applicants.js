const express = require('express');
const router = express.Router();
  
// get all applicants
router.get('/', (args, res, next) => {
    res.status(200).json({
        message: 'get all faculty',
    });
});

// get applicant by id
router.get('/:applicantId', (args, res, next) => {
    res.status(200).json({
        message: 'get applicant with id',
    });
});

// update applicant by id
router.put('/:applicantId', (args, res, next) => {
    res.status(200).json({
        message: 'get applicant with id',
    });
});

module.exports = router;