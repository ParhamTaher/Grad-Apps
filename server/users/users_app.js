const http = require('http');
const port = process.env.PORT || 3002;

const express = require('express');
const app = express();
const promise = require('promise');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// routes
const usersRoutes = require('./api/routes/users');
const facultyRoutes = require('./api/routes/faculty');
const applicantsRoutes = require('./api/routes/applicants');


const MONGO_PW = "team13db"
// Connect to database
mongoose.connect(
	'mongodb://proj-team13:' + 
	MONGO_PW + 
	'@node-rest-gradapp-shard-00-00-imzxv.mongodb.net:27017,' + 
	'node-rest-gradapp-shard-00-01-imzxv.mongodb.net:27017,' + 
	'node-rest-gradapp-shard-00-02-imzxv.mongodb.net:27017/' + 
	'test?ssl=true&replicaSet=node-rest-gradapp-shard-0&authSource=admin'
	);
mongoose.Promise = global.Promise;

// test connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to db");
});

// Log all requests to the terminal
app.use(morgan('dev'));
//body parser middle ware
app.use(bodyParser.urlencoded({ extended: false }));  // Support URL-encoded data
app.use(bodyParser.json());						  	// Support JSON-encoded data

app.use('/users', usersRoutes);
app.use('/faculty', facultyRoutes);
app.use('/applicants', applicantsRoutes);

//handle errors
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

const server = http.createServer(app);
server.listen(port, () => {
    console.log('Your server is listening on port %d (http://localhost:%d)', port, port);
});
