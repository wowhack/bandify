var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var getRawBody = require('raw-body')
var typer      = require('media-typer')
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var wav = require('wav');

app = express();

app.use(express.static(__dirname + '/public'));

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

app.listen(3000);

var Track = require('./models/track.js')
































// Audio streaming
binaryServer = BinaryServer({port: 9001});

binaryServer.on('connection', function(client) {
  var r_id = Math.floor(Math.random()*36000),
      path = 'sound/demo' + r_id + '.wav';
  
  while(fs.existsSync(path)) {
    r_id = Math.floor(Math.random()*36000);
    path = 'sound/demo' + r_id + '.wav';
  }

  
  var fileWriter = new wav.FileWriter(path, {
    channels: 1,
    sampleRate: 48000,
    bitDepth: 16
  });


  client.on('stream', function(stream, meta) {
    
    stream.pipe(fileWriter);
    
    stream.on('end', function() {
      fileWriter.end();
      app.set('r_id', path);
    });
  });
});