/**
 * Module dependencies.
 */

var chalk = require('chalk');
var express = require('express');
var http = require('http');
var logger = require('morgan');
var path = require('path');
var url = require('url');
var websocket = require('ws');

// Make sure to include the JSX transpiler
require('node-jsx').install();

var config = require('./config');
var routes = require('./config/routes');
var sockets = require('./sockets');

/**
 * Create an express application.
 */

var app = express();

/**
 * Create a http server.
 */

var server = http.createServer(app);

/**
 * Create a websocket server.
 */

var wss = new websocket.Server({server: server});

/**
 * App configuration.
 */

// view engine setup
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'html');

if (app.get('env') === 'development') {
  // don't minify html
  app.locals.pretty = true;

  // turn on console logging
  app.use(logger('dev'));
}

// static files
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes setup.
 */

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Error handlers
 */

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

/**
 * Handle websockets.
 */

sockets(wss);

/**
 * Start express server.
 */

server.listen(config.port, function() {
  var env = '\n[' + chalk.green(app.get('env')) + ']';
  var port = chalk.magenta(config.port);
  console.log(env + ' Listening on port ' + port + '...\n');
});

module.exports = app;
