const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const GapfController = require('./controllers/gapfController');
const Grid = require("gridfs-stream");
//const conn = require('../../db');
//mongoose.connect('mongodb://localhost/gapf');
const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
let gfs;

conn.once('open', () => {
  console.info('Mongo db connected successfully');
  gfs = Grid(conn.db);
  //get GAPF
  router.get('/gapf/:gapf_id', (req, res, next) => {
    let data = "";
    console.log(req.params.gapf_id);
    let readstream = gfs.createReadStream({
      _id: req.params.gapf_id,
      //need to find way for metadata.faculty_id
      root: 'Gapfs',
    });

    readstream.on('data', (chunk) => {
      data += chunk;
    });

    readstream.on('end', () => {
      // res.status(200).send({
      //   'gapf_id': req.params.gapf_id,
      //   'file': data
      // })
      console.log(data);
    });

    readstream.on('error', (err) => {
      res.status(500).send(err);
      console.log(err);
    });
  });

  //new GAPF
  router.post('/gapf/attach', (req, res, next) => {
    let part = req.files.file;
    let writeStream = gfs.createWriteStream({
      filename: part.name,
      root: 'Gapfs',
      mode: 'w',
      metadata:{
        faculty_id: req.body.faculty_id
      }
    });

    writeStream.on('close', (file) => {
      if(!file) {
        res.status(400).send('No file received');
      }
      return res.status(200).send({
          message: 'Success',
          file: file
      });
    });

    writeStream.write(part.data, () => {
      writeStream.end();
    });
  });

  //update GAPF
  router.put('/gapf/attach',GapfController.update);

  //delete GAPF
  router.delete('/gapf/:gapf_id', (req, res, next) => {
    console.log(req.params.gapf_id);
    gfs.remove({
      _id: req.params.gapf_id,
      root: 'Gapfs'
    }, (err, gridStore) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send({
          message: 'Success',
          file_name: req.params.gapf_id
      });
    });
  });
});

module.exports = router;
