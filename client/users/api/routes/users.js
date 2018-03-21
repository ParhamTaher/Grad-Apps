const express = require('express');
const router = express.Router();

// create a new user
router.post('/signUp', (args, res, next) => {
    res.status(200).json({
        message: 'user created',
    });
});
  
// log in user
router.post('/logIn', (args, res, next) => {
    res.status(200).json({
        message: 'user logged in',
    });
});


module.exports = router;