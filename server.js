const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/test", (req, res) => {
  res.send({ message: "The backend is working" });
});

const initkeycloak = require('./server/config/keycloak.config').initKeycloak();
app.use(initkeycloak.middleware());

const keycloak = require('./server/config/keycloak.config').getKeycloak();

//routes
require("./server/routes/private.routes")(app);

const db = require("./server/models/db.model");

 if(process.env.NODE_ENV == 'development') { 
  console.log("Running in Development")
  const dbconn = process.env.DB_CONN
  db.mongoose
    .connect(dbconn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log("Successfully connect to MongoDB Dev.");
    })
    .catch(err => {
      console.error("Connection error", err);
      process.exit();
    });
 } else if (process.env.NODE_ENV == 'production') { 
    console.log("I am running in Production")
 } else {
  const dbconn = process.env.DB_CONN_TEST
  console.log("Running in Test")
  db.mongoose
    .connect(dbconn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log("Successfully connect to MongoDB Test.");
    })
    .catch(err => {
      console.error("Connection error", err);
      process.exit();
    });
 }

//serve static assets if in production
app.use(express.static('frontend/build'));

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
