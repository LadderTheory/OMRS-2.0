const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const dbConfig = require("./server/config/db.config");

const missionRouter = require('./server/routes/missions');
const userRouter = require('./server/routes/users');
const parameterRouter = require('./server/routes/parameter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Missions Router for API
//app.use('/missions', missionRouter);

//Users Router for API
//app.use('/users', userRouter);

//parameters router for API
//app.use('/parameters', parameterRouter);

//routes
require("./server/routes/auth.routes")(app);
require("./server/routes/private.routes")(app);

const db = require("./server/models/db.model");
db.mongoose
  .connect(`mongodb://${dbConfig.USER}:${dbConfig.PW}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DBNAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


//serve static assets if in production
app.use(express.static('DemoApp/build'));

app.get('*', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, 'DemoApp', 'build', 'index.html'));
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
