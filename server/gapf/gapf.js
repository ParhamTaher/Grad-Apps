const express = require('express');
const routes = require('./api/routes');

const port = process.env.port || 3000;
//set up express app
const app = express();

app.use(routes);

app.listen(port, function(){
  console.log("now listening for requests on port '%d'", port);
})
