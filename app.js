var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mainRouter = require('./routes/main');
var loginRouter = require('./routes/login');
var adding_entriesRouter = require('./routes/adding_entries');
var searchRouter = require('./routes/search');

var accountsRouter = require('./routes/accounts');

var app = express();
console.log('1');
// var exphbs = require('express-handlebars');

console.log('2');
var exphbs = require('express-handlebars');
var hbs = require('./helpers/handlebars.js')(exphbs);
var hbsHelpers = exphbs.create({
    helpers: require("./helpers/handlebars").hbsHelpers,
    defaultLayout: 'layout',
    extname: '.hbs'
});
console.log('3');
hbsHelpers.handlebars.registerHelper(hbs.helpers);
console.log("----------------------");
console.log(hbs.helpers);//------------- herehereherehere
app.use(express.static(path.join(__dirname, '/public'))); 
app.use(express.static(path.join(__dirname, 'node_modules/materialize-css/dist')));  

// view engine setup
app.engine('hbs', hbsHelpers.engine); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/main', mainRouter);
app.use('/login', loginRouter);
app.use('/accounts', accountsRouter);
app.use('/adding_entries', adding_entriesRouter);
app.use('/search', searchRouter);

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
