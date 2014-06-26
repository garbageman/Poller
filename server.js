var flash = require('connect-flash');
var connect = require('connect');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');

var passport = require('passport');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/etc/node/nodeapps/Poller/data');

require('./config/passport')(passport); // pass passport for configuration

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();
var RedisStore = require('connect-redis')(session);

// view engine setup
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(connect.session({ 
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    db: 2,
    pass: '1234567890'
  }),
  secret: 'quantumleapsabound', key: 'sid'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//app.use('/', routes);
//app.use('/users', users);

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(80);
console.log("Listening on port 80");

module.exports = app;
