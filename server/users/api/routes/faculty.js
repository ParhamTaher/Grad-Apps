const express = require('express');
const router = express.Router();
  
// get all faculty
router.get('/', (args, res, next) => {
    res.status(200).json({
        message: 'get all faculty',
    });
});

// get faculty by id
router.get('/:facultyId', (args, res, next) => {
    res.status(200).json({
        message: 'get faculty with id',
    });
});
  
// update faculty by id
router.put('/:facultyId', (args, res, next) => {
    res.status(200).json({
        message: 'get faculty with id',
    });
});
  

module.exports = router;