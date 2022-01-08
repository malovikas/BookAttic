var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var upload = multer();

var homeRouter = require('./routes/home');
var booksRouter = require('./routes/books');
var aboutRouter = require('./routes/about');
var categoriesRouter = require('./routes/categories');
var authorsRouter = require('./routes/authors');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

var expressLayouts = require('express-ejs-layouts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use(upload.array(20));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));

app.use('/', homeRouter);
app.use('/books', booksRouter);
app.use('/about', aboutRouter);
app.use('/categories', categoriesRouter);
app.use('/authors', authorsRouter);
app.use('/login', loginRouter)
app.use('/register', registerRouter)

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
  res.render('partials/error');
});

module.exports = app;
