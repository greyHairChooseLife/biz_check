var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const cors = require('cors');

var indexRouter = require('./routes/index');
const apiRequestRouter = require('./routes/requestAPI');
const downloadFormRouter = require('./routes/downloadForm');
const contactRouter = require('./routes/contact');

var app = express();



//app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use( logger(function (tokens, req, res) {
	return [
		tokens['status'](req, res),
		tokens['date'](req, res),
		'\n',
		tokens['remote-addr'](req, res),
		' ==> ',
		tokens['user-agent'](req, res),
		'\n',
		tokens['method'](req, res),
		tokens['url'](req, res),
		'\n',
		tokens['referrer'](req, res),
		'\n',
	].join(' ')
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/apiRequest', apiRequestRouter);
app.use('/downloadForm', downloadFormRouter);
app.use('/contact', contactRouter);

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
  res.render('error');
});

module.exports = app;
