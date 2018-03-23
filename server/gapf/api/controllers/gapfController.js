const mongoose = require('mongoose');

const Gapf = require('../models/gapfModel');
const Grid = require("gridfs-stream");
//const conn = require('../../db');
mongoose.connect(
	'mongodb://proj-team13:' +
	'team13db' +
	'@node-rest-gradapp-shard-00-00-imzxv.mongodb.net:27017,' +
	'node-rest-gradapp-shard-00-01-imzxv.mongodb.net:27017,' +
	'node-rest-gradapp-shard-00-02-imzxv.mongodb.net:27017/' +
	'test?ssl=true&replicaSet=node-rest-gradapp-shard-0&authSource=admin'
	);
//mongoose.connect('mongodb://localhost/gapf');
const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
let gfs;

exports.get = (req, res, next) => {
  Gapf
    .find({})
    .then(function(gapf){
      res.status(200).send(gapf);
    })
    .catch(next);
};


exports.create = (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  let part = req.files.file;
  let writeStream = gfs.createWriteStream({
      filename: part.name,
      metadata:{
        faculty_id: req.body.faculty_id
      }
  });

  writeStream.on('close', (file) => {
    // checking for file
    if(!file) {
      res.status(400).send('No file received');
    }
      return res.status(200).send({
          message: 'Success',
          file: file
      });
  });
  // using callbacks is important !
  // writeStream should end the operation once all data is written to the DB
  writeStream.write(part.data, () => {
    writeStream.end();
  });
  //res.status(200).send(req);
  // Gapf
  //   .create(req.body)
  //   .then(function(gapf){
  //     res.status(200).send(gapf);
  //   })
  //   .catch(next);
};

exports.update = (req, res, next) => {
  Gapf
    .findByIdAndUpdate({_id: req.body.id}, req.body)
    .then(function(){
      Gapf
        .findOne({_id: req.body.id})
        .then(function(gapf){
          res.status(200).send(gapf);
      });
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  Gapf
    .findByIdAndRemove({_id: req.body.id})
    .then(function(gapf){
      res.status(200).send(gapf);
    })
    .catch(next);
};
