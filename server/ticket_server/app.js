const express = require('express');
const app = express();

const ticketRoutes = require('./api/routes/tickets');

app.use('/tickets', ticketRoutes);

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

module.exports = app;