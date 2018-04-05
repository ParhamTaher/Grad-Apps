const express = require('express');

const http = require('http');
//set up express app
const app = express();
//const bodyParser = require('body-parser');
const busboy = require('busboy-body-parser');
const gapfRoutes = require('./api/routes');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('config');
const request = require('request-json');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const port = process.env.port || 3001;

mongoose.connect(config.DBHost);
mongoose.Promise = global.Promise;

//middleware

//sessions
app.use(session({
	secret: 'csc 302 team 13',
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({
	  mongooseConnection: mongoose.connection
	})
}));

function hasSession(req, res, next) {
  //console.log(req.session);
	if (req.session.userId && (req.session.role === 'FSS' || req.session.role === 'Budget Director' || req.session.role === 'Faculty')) {
		next();
	} else {
		const error = new Error('Unauthorized User');
		error.status = 401;
		next(error);
	}
}

app.use(morgan('dev'));
app.use(busboy());
app.use(hasSession);
app.use(gapfRoutes);

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

//console.log(process.env.NODE_ENV)
const server = http.createServer(app);
server.listen(port, function() {
    console.log("now listening for requests on port '%d'", port);
});

module.exports = app;
