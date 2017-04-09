const config = require('./config.js').get(process.env.NODE_ENV);
const express = require('express');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

const dbConnection = require('./db/db.js').get();
const passport = require('./passport.config.js');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: config.session.secret,
	resave: config.session.resave,
	saveUninitialized: config.session.saveUninitialized,
	httpOnly: config.session.httpOnly,
  store: new MongoStore({ mongooseConnection: dbConnection })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

const router = require("./routes/router.js")(passport);

const node_modules = "./client/node_modules";
const dist = "./client/dist";

app.use("/node_modules", express.static(path.join(__dirname, node_modules)));
app.use("/api", router.api);

// angular2 app
app.use("/", express.static(path.join(__dirname, dist)));

// angular2 routes that have different urls but all map to index.html
app.use("/", router.client);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err.message);

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
