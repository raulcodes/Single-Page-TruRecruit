var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var firebase = require('firebase');

var routes = require('./routes/index');
var users = require('./routes/users');


console.log(users.str);
var app = express();

var config = {
    apiKey: "AIzaSyA-x9QZH1YezDMX-GPxsNPyK3H0WwQ5cFw",
    authDomain: "blistering-heat-648.firebaseapp.com",
    databaseURL: "https://blistering-heat-648.firebaseio.com",
    projectId: "blistering-heat-648",
    storageBucket: "blistering-heat-648.appspot.com",
    messagingSenderId: "610839407937"
  };
firebase.initializeApp(config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes);


app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// post login
app.post('/login', (req, res, next) => {

  console.log(req.body.email);

  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // var both = errorMessage + " " + errorCode;
    if (error) {
      res.render('login', { error: errorMessage });
    } else {
      res.redirect('/');
    }
    // ...
  });
});


app.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'SignUp' });
});

app.post('/signup', (req, res) => {

  if (req.body.email != req.body.cemail || req.body.password != req.body.cpassword) {
    error = "Emails or passwords do not match";
    res.render('signup', { error: error });
  } else {

    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    if (error) {
      res.render('signup', { error: errorMessage });
    } else {
      res.render('profile', { email: req.body.email });
    }
    // ...
    });
  }
});

// app.get('/profile', (req, res, next) => {
//   res.render('profile', { })
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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


module.exports = app;
