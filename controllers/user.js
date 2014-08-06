var User = require('../models/user.js');
var app = require('express');

exports.login = function(req, res) {
  // render the page and pass in any flash data if it exists
	res.render('', { message: req.flash('loginMessage')});
}

// Show the signup page
exports.signup = function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup', { message: req.flash('signupMessage') });
};

exports.show = function(req, res) {
  res.render('user/index', {
    user : req.user // get the user out of session and pass to template
  });
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.search = function(req, res) {
  var userID = req.params.id;

  User.findById(userID, function(err, user) {
    res.json({ user: user });
  });
}

exports.searchUsername = function(req, res) {
  var userName = req.params.id;

  User.find({username: userName }, function(err, users) {
    console.log('users', users);
    res.json({ users: users });
  })
}