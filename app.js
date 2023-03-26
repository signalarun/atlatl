var config = require('./config/config.js');
var accountManager = require('./module/account-manager/index');
//var accountManagerRoutes = require('./module/account-manager/routes/api')
require('./config/mongoose');
var createError = require('http-errors');
var flash = require('connect-flash');
// Web framework
var express = require('express');
const session = require('express-session');
// Session persistance
const MongoStore = require('connect-mongo')(session);
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
// Templating engine requirement
var layouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
//var apiRouter = require('./routes/api');
const { response } = require('express');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.use(layouts);

app.use(logger('dev')); // Activates loging
app.use(express.json()); // For analysing request data
app.use(express.urlencoded({ extended: false })); // For analysing request data
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public'))); // Setting up public directories

app.use(flash());
// TODO remove if session not required
app.use(session({
  secret: 'keyboard cat', resave: false, saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: require('mongoose').connection })
}));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(accountManager.passport.passport.initialize());
/*
 Should be called after express.session()
 https://stackoverflow.com/questions/27010013/express-session-vs-passportjs-session
 */
app.use(accountManager.passport.passport.session());

/*
Middleware to print requests
app.use((req, res, next)=>{
    console.log(`Request made to URL - ${req.url}`);
    next();
});
*/

// ROUTES
app.use('/', indexRouter);
// App APIS are available here
//app.use('/api', apiRouter);
app.use('/api', accountManager.routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).render("404");
  //  next(createError(404));
});

// error handler, an error handling middleware
app.use(function (err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;