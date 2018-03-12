const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const ticketRoutes = require('./api/routes/tickets');

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