const express = require('express');

const router = express.Router();

//get GAPF
router.get('/gapf', function(req, res){
  res.send({type: 'GET'});
  }
)

//new GAPF
router.post('/gapf/attach', function(req, res){
  res.send({type: 'POST'});
  }
)

//update GAPF
router.put('/gapf/attach', function(req, res){
  res.send({type: 'PUT'});
  }
)

module.exports = router;
