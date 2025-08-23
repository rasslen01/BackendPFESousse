var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const http = require('http');
require('dotenv').config()

const {connectToMongoDB} = require('./config/db');

var indexRouter = require('./routes/index');
const fieldsRouter = require('./routes/FieldsRoute');
const userRouter = require('./routes/UserRoute');
const matchRouter = require('./routes/MatchRoute');
const ReservationRouter = require('./routes/ReservationRoute');
const OrganizerRouter = require('./routes/OrganizerRoute');
const ManagerRouter = require('./routes/ManagerRoute');


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/fields', fieldsRouter);
app.use('/user', userRouter);
app.use('/match', matchRouter);
app.use('/reservation', ReservationRouter);
app.use('/organizer', OrganizerRouter);
app.use('/manager', ManagerRouter);

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
  res.json('error');
});

const server = http.createServer(app);
server.listen(process.env.port, () => {
  connectToMongoDB();
  console.log('Server is running on port', process.env.port)});
