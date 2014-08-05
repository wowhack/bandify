var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var getRawBody = require('raw-body')
var typer      = require('media-typer')

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '10000mb',
    encoding: 'utf-8'
  }, function (err, string) {
    if (err)
      return next(err)

    req.text = string
    next()
  })
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');




// moongoose stuff
mongoose.connect('mongodb://localhost/bandify');

// routes/controllers
var example = require('./controllers/example');
var jam = require('./controllers/jam');
var user = require('./controllers/user');
var track = require('./controllers/track');

app.get('/', function(req, res) {
  res.render('hello');
});

app.get('/jam', jam.index);
app.get('/jam/create', jam.create);
app.post('/jam/save', jam.save);
app.get('/user', user.index)

app.get('/tracks', track.index)
app.get('/tracks/create', track.create);
app.post('/tracks/save', track.save);
app.get('/tracks/:id', track.show)
app.get('/example', example.index);

app.post('/tracks/test', track.test);
app.listen(3000);