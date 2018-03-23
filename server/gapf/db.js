const mongoose = require('mongoose');

// Connect to database
// const mongoURI =
//   'mongodb://proj-team13:' +
// 	'team13db' +
// 	'@node-rest-gradapp-shard-00-00-imzxv.mongodb.net:27017,' +
// 	'node-rest-gradapp-shard-00-01-imzxv.mongodb.net:27017,' +
// 	'node-rest-gradapp-shard-00-02-imzxv.mongodb.net:27017/' +
// 	'test?ssl=true&replicaSet=node-rest-gradapp-shard-0&authSource=admin';
//
// const db = mongoose.createConnection(mongoURI);
//
// db.on('error', (err) => {
//   if(err) throw err;
// });
//
// db.once('open', () => {
//   console.info('Mongo db connected successfully');
// });
mongoose.connect(
	'mongodb://proj-team13:' +
	'team13db' +
	'@node-rest-gradapp-shard-00-00-imzxv.mongodb.net:27017,' +
	'node-rest-gradapp-shard-00-01-imzxv.mongodb.net:27017,' +
	'node-rest-gradapp-shard-00-02-imzxv.mongodb.net:27017/' +
	'test?ssl=true&replicaSet=node-rest-gradapp-shard-0&authSource=admin'
	);
mongoose.connect('mongodb://localhost/gapf');

//module.exports = db;
