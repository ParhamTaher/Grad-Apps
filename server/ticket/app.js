const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ticketRoutes = require('./api/routes/tickets');

// Connect to database
mongoose.connect(
	'mongodb://proj-team13:' + 
	process.env.MONGO_PW + 
	'@node-rest-gradapp-shard-00-00-imzxv.mongodb.net:27017,' + 
	'node-rest-gradapp-shard-00-01-imzxv.mongodb.net:27017,' + 
	'node-rest-gradapp-shard-00-02-imzxv.mongodb.net:27017/' + 
	'test?ssl=true&replicaSet=node-rest-gradapp-shard-0&authSource=admin'
	);
mongoose.Promise = global.Promise;

// Log all requests to the terminal
app.use(morgan('dev'));
//body parser middle ware
app.use(bodyParser.urlencoded({ extended: false }));  // Support URL-encoded data
app.use(bodyParser.json());						  	// Support JSON-encoded data

// Route that handles ticket requests
app.use('/tickets', ticketRoutes);

// Handle errors
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

module.exports = app;