const express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();
const GapfController = require('./controllers/gapfController');
const Grid = require("gridfs-stream");
const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;

let gfs;
conn.once('open', () => {
  console.info('Mongo db connected successfully');
  gfs = Grid(conn.db);
  gfs.collection('Gapfs');
  //get GAPF

  router.get('/gapf', (req, res, next) => {
    //change to request session later
    gfs.files.find({'metadata.faculty_id' : '12'}).toArray((err, files) =>{

      if (!files || files.length === 0){
        return res.status(404).json({
          err: 'No files exist'
        });
      }

      res.json(files);
    });
  });

  router.get('/gapf/:gapf_id/download', (req, res, next) => {
    const gapf_id = req.params.gapf_id;
    gfs.files.findOne({
      _id : new ObjectId(req.params.gapf_id)},
      (err, file) =>{

      if (!file || file.length === 0){
        return res.status(404).json({
          err: 'No file exist'
        });
      }

      console.log(file._id);

      let readstream = gfs.createReadStream({
        _id: file._id,
        //need to find way for metadata.faculty_id
        root: 'Gapfs',
      });

      res.set('gapf_id', file._id);
      res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
      res.set('Content-Type', file.contentType);
      readstream.pipe(res);

      readstream.on('error', (err) => {
        res.status(500).send(err);
        console.log(err);
      });
    });
  });

  //new GAPF
  router.post('/gapf/attach', (req, res, next) => {
    let part = req.files.file;
    let writeStream = gfs.createWriteStream({
      filename: part.name,
      root: 'Gapfs',
      mode: 'w',
      content_type: part.mimetype,
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

  //delete GAPF
  router.delete('/gapf/:gapf_id/delete', (req, res, next) => {
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
