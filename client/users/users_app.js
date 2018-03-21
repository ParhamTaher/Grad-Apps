const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const promise = require('promise');

// routes
const usersRoutes = require('./api/routes/users');
const facultyRoutes = require('./api/routes/faculty');
const applicantsRoutes = require('./api/routes/applicants');

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
