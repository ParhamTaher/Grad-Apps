if (!process.env.NODE_ENV)
  process.env.NODE_ENV = 'dev';

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let config = require('config');

const ticketRoutes = require('./api/routes/tickets');

// Connect to database
mongoose.connect(config.DBHost);
mongoose.Promise = global.Promise;

// test connection
var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
	  console.log("Connected to db");
});

// Log all requests to the terminal if not in test
if(config.util.getEnv('NODE_ENV') !== 'test') {
	app.use(morgan('combined'));
}

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
