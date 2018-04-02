const express = require('express');
//const bodyParser = require('body-parser');
const busboy = require('busboy-body-parser');
const gapfRoutes = require('./api/routes');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Grid = require('gridfs-stream');
const fs = require('fs');
const port = process.env.port || 3001;

mongoose.connect(
    'mongodb://proj-team13:' +
        'team13db' +
        '@node-rest-gradapp-shard-00-00-imzxv.mongodb.net:27017,' +
        'node-rest-gradapp-shard-00-01-imzxv.mongodb.net:27017,' +
        'node-rest-gradapp-shard-00-02-imzxv.mongodb.net:27017/' +
        'test?ssl=true&replicaSet=node-rest-gradapp-shard-0&authSource=admin'
);

mongoose.Promise = global.Promise;

//set up express app
const app = express();

//middleware
//app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(busboy());
app.use(gapfRoutes);

app.use(function(err, req, res, next) {
    //console.log(err);
    res.send({ error: err.message });
});

app.listen(port, function() {
    console.log("now listening for requests on port '%d'", port);
});
