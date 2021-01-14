//backend server dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//module for connecting to the databae
const mongoose = require('mongoose');
//handling http requests
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//initializes and configures express
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//testing route/API Endpoint
app.get("/test", (req, res) => {
  res.send({ message: "The backend is working" });
});
//tells the express backend to serve the frontend content to the user when the app is running in production mode
app.use(express.static('frontend/build'));
//initializes keycloak authentication and points to the keycloak config file
const initkeycloak = require('./server/config/keycloak.config').initKeycloak();
app.use(initkeycloak.middleware());
const keycloak = require('./server/config/keycloak.config').getKeycloak();

//points to the protected routes/API endpoints for the app
require("./server/routes/private.routes")(app);
//points to the database model for the app
const db = require("./server/models/db.model");
//initializes the connection to the mongoDB with mongoose. changes the connection string based on the environment
//The connection string contains sensitive information so it is stored in an environmental variable
//See readme.md for instructions on setting up the .env file containing the environmental variables
 if(process.env.NODE_ENV == 'development') { 
  console.log("Running in Development")
  const dbconn = process.env.DB_CONN
  db.mongoose
    .connect(dbconn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      retryWrites: false
    })
    .then(() => {
      console.log("Successfully connect to MongoDB Dev.");
    })
    .catch(err => {
      console.error("Connection error", err);
      process.exit();
    });
 } else if (process.env.NODE_ENV == 'production') { 
  //When the app is ready to be deployed into production the database connection info for the production
  //database will go here in this section of the if else statement  
  console.log("I am running in Production")
 } else {
  const dbconn = process.env.DB_CONN_TEST
  db.mongoose
    .connect(dbconn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      retryWrites: false
    })
    .then(() => {
    })
    .catch(err => {
      console.error("Connection error", err);
      process.exit();
    });
 }

//tells the express backend to serve the frontend content to the user when the app is running in production mode
app.get('*', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;
