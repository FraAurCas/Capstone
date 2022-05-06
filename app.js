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
var loginRouter = require('./routes/login');
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
app.use('/adding-entries', addingentriesRouter);
app.use('/search', searchRouter);
app.use('/file-upload', fileuploadRouter);

//Login stuff
app.use(session({ secret: oauth.web.client_secret }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = oauth.web.client_id;
const GOOGLE_CLIENT_SECRET = oauth.web.client_secret;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/main"
},
  function (accessToken, refreshToken, profile, done) {
    userProfile = profile;
    return done(null, userProfile);
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

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
