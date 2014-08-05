var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');

app.set('view engine', 'jade');

// moongoose stuff
mongoose.connect('mongodb://localhost/bandify');

// routes/controllers
var example = require('./controllers/example');
var jam = require('./controllers/jam');

app.get('/', function(req, res) {
  res.render('hello');
});

app.get('/jam', jam.index);
app.get('/jam/create', jam.create);

app.get('/example', example.index);



app.listen(3000);