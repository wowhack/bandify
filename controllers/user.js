var Track = require('../models/user.js');
var app = require('express');

exports.login = function(req, res) {
  // render the page and pass in any flash data if it exists
	res.render('login', { message: req.flash('loginMessage')});
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
}

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
}