var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Session and auth
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var auth = require('./controllers/auth');

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

app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
require('./passportConfig')(passport);
app.use(session({ secret: 'krobbelovesburgers' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes/controllers
var example = require('./controllers/example');
var jam = require('./controllers/jam');
var user = require('./controllers/user');
var track = require('./controllers/track');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/login', user.login);
app.get('/signup', user.signup);
app.get('/logout', user.logout);

app.get('/user', auth.isLoggedIn, user.show);

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

app.get('/jam', auth.isLoggedIn, jam.index);
app.get('/jam/create', jam.create);
app.post('/jam/save', jam.save);

app.get('/tracks', track.index)
app.get('/tracks/create', track.create);
app.post('/tracks/save', track.save);
app.get('/tracks/:id', track.show)
app.get('/example', example.index);

app.listen(3000);