const express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();
// const GapfController = require('./controllers/gapfController');
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
    //if faculty, get only files associated with that faculty
    if (req.session.role == 'Faculty') {
      gfs.files.find({'metadata.userId' : req.session.userId}).toArray((err, files) =>{

        if (!files || files.length === 0){
          return res.status(404).json({
            err: 'No files exist'
          });
        }

        res.json(files);
      });
    } //else get all Gapf's if its FSS or budget director
      else if ((req.session.role == 'FSS') || (req.session.role == 'Budget Director')){
      gfs.files.find().toArray((err, files) =>{

        if (!files || files.length === 0){
          return res.status(404).json({
            err: 'No files exist'
          });
        }
        res.status(200).json(files);
      });
    } else {
      res.status(401).json({
        message: 'Unauthorized User*'
      });
    }
  });

  router.get('/gapf/:gapf_id', (req, res, next) => {
    //const gapf_id = req.params.gapf_id;
    gfs.files.findOne({
      _id : new ObjectId(req.params.gapf_id)},
      (err, file) =>{

      if (!file || file.length === 0){
        return res.status(404).json({
          err: 'No file exist'
        });
      }

      //console.log(file._id);

      let readstream = gfs.createReadStream({
        _id: file._id,
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
  router.post('/gapf', (req, res, next) => {
    //console.log(req.files)
    //console.log(req.body)
    let userId = req.session.userId;
    //check the request userid passed in equals to logged in use and if they're faculty or fss
    if (userId && (req.session.role === 'Faculty' || req.session.role === 'FSS')){
      let part = req.files.file;
      let writeStream = gfs.createWriteStream({
        filename: part.name,
        root: 'Gapfs',
        mode: 'w',
        content_type: part.mimetype,
        metadata:{
          userId: userId,
          role: req.session.role
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
      } else {
        res.status(401).json({
          message: 'Unauthorized User*'
        });
      }
  });

  //delete GAPF
  router.delete('/gapf/:gapf_id', (req, res, next) => {
    //console.log(req.params.gapf_id);
    //only faculty can delete their own file
    if (req.session.role === 'Faculty'){
      //check if the file is created by user trying to delete it
      gfs.exist({
        _id : new ObjectId(req.params.gapf_id),
        'metadata.userId': req.session.userId,
        root: 'Gapfs'
      }, (err, found) =>{

        if (err) {
          return res.status(500).json({
            message: 'error checking if file exists in delete request'
          })
        }

        if (found) {
          gfs.remove({
            _id: req.params.gapf_id,
            root: 'Gapfs'
          }, (err, gridStore) => {
            if (err) {
              return res.status(500).json({
                message: 'error removing file'
              });
            }
            return res.status(200).send({
                message: 'Success',
                fileId: req.params.gapf_id
              });
          });
        } else{
          return res.status(404).json({
            err: 'Cant delete because the file doesnt exist or not authorized to delete'
          });
        }
    });
    } else {
      res.status(401).json({
        message: 'Unauthorized User: delete'
      });
    }
  });
});


module.exports = router;
