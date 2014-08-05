var express = require('express');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bandify');

var app = express();
var example = require('./controllers/example');
var user = require('./controllers/user');

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');

app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('hello');
});

app.get('/example', example.index);
app.get('/user', user.index)


app.listen(3000);