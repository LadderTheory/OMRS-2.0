const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//var indexRouter = require('./server/routes/index');
const missionRouter = require('./server/routes/missions');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'server/views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./DemoApp/build/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//app.use('/', indexRouter);




app.use('/missions', missionRouter);

//setup mongoose connection to mongodb
const { DB_CONN, DB_USER, DB_PW } = process.env;

mongoose
  .connect(
    DB_CONN,
    { auth: { user: DB_USER, password: DB_PW }, useNewUrlParser: true,  useUnifiedTopology: true}
  )
  .then( () => console.log('Successfully connected to DB'))
  .catch(console.error);

//serve assets if in dev
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + 'index.html');
// });

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
