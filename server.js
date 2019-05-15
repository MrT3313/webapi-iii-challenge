const express = require('express');
const helmet = require('helmet');
const logger = require('morgan')
const server = express();

// SET UP SERVER
  //run built in middleware
    server.use(express.json());

  //run third party middleware
    server.use(helmet());
    server.use(logger('dev'))
  
  //run custom middleware
    server.use(typeLogger)
    server.use(moodyGatekeeper)

  // routing
    // import routers
      const usersRouter = require('./users/userRouter')
      const postsRouter = require('./posts/postRouter')

    // use routers
      server.use('/api/users', usersRouter )
      server.use('/api/posts', postsRouter )

// GLOBAL MIDDLEWARE FUNCTIONS
  function typeLogger(req,res,next) {
    console.log(req)
    
    console.log(`TYPE OF REQUEST-> ${req.method} Request`)
    console.log(`REQ URL -> ${req.originalUrl}`)
    console.log(`TIME STAMP -> `, new Date())
    next()
  }

  function moodyGatekeeper(req, res, next) {
    const seconds = new Date().getSeconds();

    if (seconds % 3 === 0 ) {
      res.status(403).json({ message: "YOU SHALL NOT PASS -- moody gatekeeper middleware"})
    } else {
      next()
    }
  }

// Homepage Routing
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;
