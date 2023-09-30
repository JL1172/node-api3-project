const express = require('express');
const UserRouter = require("../api/users/users-router"); 

//import middleware
const morgan = require("morgan");
const {logger} = require("./middleware/middleware")
//import middleware


//instantiating
const server = express();
//instantiating


// remember express by default cannot parse JSON in request bodies
server.use(express.json());


// middleware
server.use(morgan("dev"));
server.use(logger);
// middleware

//routes
server.use("/api/users",UserRouter)
//routes



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
