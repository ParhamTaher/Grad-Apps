process.env.PORT = 5000;
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5000;
const userPort = process.env.PORT || 3002;

const server = http.createServer(app);
server.listen(port);

const userServer = http.createServer(app);
server.listen(userPort);