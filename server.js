const express = require('express');
const helmet = require('helmet');
const logger = require('morgan')
const server = express();

// GLOBAL MIDDLEWARE
  //built in middleware
    server.use(express.json());

  //custom middleware
    server.use(helmet());
    server.use(logger('dev'))
 

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

  // function logger(req, res, next) {

  // };


module.exports = server;
