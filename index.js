require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const passport = require('passport');
require('./app/middleware/passport')(passport);

const app = express();
const server = http.createServer(app);


var corsOptions = {
    origin: "http://localhost:3000",
    credentials : true
  };
  
  app.use(cors(corsOptions));
  app.use(function (req, res, next) {	
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
    res.setHeader('Access-Control-Allow-Credentials', true);    
    next();
});


app.use(express.static('public'));

const port = process.env.PORT || 8001;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

server.listen(port);

console.log("RESTful API server started on: " + port);

