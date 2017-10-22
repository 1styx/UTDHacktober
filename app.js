var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongojs = require('mongojs');
var connectionString = "mongodb://nazdevwilson:audrey371000@hobbysite-shard-00-00-uzg5h.mongodb.net:27017,hobbysite-shard-00-01-uzg5h.mongodb.net:27017,hobbysite-shard-00-02-uzg5h.mongodb.net:27017/hackathon?ssl=true&replicaSet=HobbySite-shard-0&authSource=admin";
var db = mongojs(connectionString, ['searches']);
var ObjectId = mongojs.ObjectId;

var index = require('./routes/index');
var users = require('./routes/users');
var amazonSearch = require('./routes/amazonSearch');

var app = express();

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

// Shorten routes
app.use('/', index);
app.use('/users', users);
app.use('/amazonSearch', amazonSearch);

app.get('/mongo', function(req, res) {
  db.searches.find({search: req.body.search}, function(err, docs) {
    res.send(docs);
  });
});

app.post('/mongo', function(req, res) {
  //console.log('We got request: ' + req.body);
  //console.log('With attribs: ' + Object.keys(req.body));
  //console.log('search: ' + req.body.search + ', profit: ' + req.body.profit);
  var i = 0;
  db.searches.find({search: req.body.search}, function(err, docs) {
    //console.log(JSON.stringify(docs, null, 2));

    if(docs.length === 0) {
      //console.log('Inserting...');
      db.searches.insert({search: req.body.search, profit: req.body.profit});
    }
    else {
      //console.log('Updating...');
      db.searches.update({search: req.body.search}, {$set: {profit: req.body.profit}});
    }

    res.send('Successful entry');
  });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
