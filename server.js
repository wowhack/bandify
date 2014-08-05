var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'jade');

// moongoose stuff
mongoose.connect('mongodb://localhost/bandify');

// routes/controllers
var example = require('./controllers/example');
var jam = require('./controllers/jam');
var user = require('./controllers/user');
var track = require('./controllers/track');
var musixmatch = require('./controllers/musixmatch');

app.get('/', function(req, res) {
  res.render('hello');
});

app.get('/jam', jam.index);
app.get('/jam/create', jam.create);
app.post('/jam/save', jam.save);
app.get('/jam/search', jam.search);
app.get('/jam/:id', jam.show);
app.get('/jam/search/:id', jam.searchResult);



app.get('/user', user.index)

app.get('/tracks', track.index)
app.get('/tracks/create', track.create);
app.post('/tracks/save', track.save);
app.get('/tracks/:id', track.show)
app.get('/example', example.index);

app.get('/musixmatch/:artist/:title', musixmatch.findSongs);

app.listen(3000);