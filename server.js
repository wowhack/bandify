var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var getRawBody = require('raw-body')
var typer      = require('media-typer')
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var wav = require('wav');

// Session and auth
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var auth = require('./controllers/auth');

app = express();


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// moongoose stuff
mongoose.connect('mongodb://localhost/bandify');

app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
require('./passportConfig')(passport);
app.use(session({ secret: 'krobbelovesburgers' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Always pass user session object if available (equals to logged in)
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});


// routes/controllers
var example = require('./controllers/example');
var jam = require('./controllers/jam');
var user = require('./controllers/user');
var track = require('./controllers/track');
var musixmatch = require('./controllers/musixmatch');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/signup', user.signup);
app.get('/login', user.login);
app.get('/logout', user.logout);

// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/user', // redirect to the secure user section
	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

// process the login form
app.post('/login', passport.authenticate('local-login', {
	successRedirect : '/user', // redirect to the secure user section
	failureRedirect : '/login', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

app.get('/user', auth.isLoggedIn, user.show);
app.get('/user/:id', user.search);

app.get('/jam', jam.index);
app.get('/jam/create', auth.isLoggedIn, jam.create);
app.post('/jam/save', auth.isLoggedIn, jam.save);
app.get('/jam/search', jam.search);
app.get('/jam/:id', jam.show);
app.get('/jam/delete/:id', jam.delete);
app.get('/jam/search/:id', jam.searchResult);
app.post('/jam/addTrack', jam.addTrack);

app.get('/tracks', track.index)
app.get('/tracks/create', auth.isLoggedIn, track.create);
app.post('/tracks/save', auth.isLoggedIn, track.save);
app.get('/tracks/:id', track.show)
app.get('/example', example.index);

app.get('/musixmatch/:artist/:title', musixmatch.findSongs);

app.listen(3000);

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
