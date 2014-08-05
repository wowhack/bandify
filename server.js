var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');

app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('hello');
});

app.listen(3000);