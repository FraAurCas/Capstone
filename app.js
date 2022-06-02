var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("passport");
var oauth = require("./data/oauth_keys.json")
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mainRouter = require('./routes/main');
//var loginRouter = require('./routes/login');
var addingentriesRouter = require('./routes/adding-entries');
var searchRouter = require('./routes/search');
var fileuploadRouter = require('./routes/file-upload')
var accountsRouter = require('./routes/accounts');

var app = express();
// var exphbs = require('express-handlebars');

var exphbs = require('express-handlebars');
var hbs = require('./helpers/handlebars.js')(exphbs);
var hbsHelpers = exphbs.create({
    helpers: require("./helpers/handlebars").hbsHelpers,
    defaultLayout: 'layout',
    extname: '.hbs'
});

hbsHelpers.handlebars.registerHelper(hbs.helpers);
// console.log("----------------------");
// console.log(hbs.helpers);//------------- herehereherehere
app.use(express.static(path.join(__dirname, '/public'))); 
app.use(express.static(path.join(__dirname, 'node_modules/materialize-css/dist')));  
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'https://digital-data-display.herokuapp.com/',
  clientID: 'SBaAruVAcDGkxT5jSBs4u5fqqMICEHpo',
  issuerBaseURL: 'https://dev-7yxgqdsh.us.auth0.com',
  secret: 'e96e234f5a27051e6b73232a61edb6593095e7512943dad8ae70070922e5d32f'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/logging', (req, res) => {
  //res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

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
//app.use('/login', loginRouter);
app.use('/accounts', accountsRouter);
app.use('/adding-entries', addingentriesRouter);
app.use('/search', searchRouter);
app.use('/file-upload', fileuploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
