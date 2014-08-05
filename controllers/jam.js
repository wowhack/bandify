var Jam = require('../models/jam');

// list all existing jams?
exports.index = function(req, res) {
  Jam.find({}, function(err, jams) {
    res.render('jam/list', { jams: jams });  
  });
};

// return a form for creating a new jam
exports.create = function(req, res) {
  res.render('jam/new');
};

//
exports.show = function(req, res) {
  var jamID = req.params.id;

  Jam.findById(jamID, function(err, jam) {
    res.render('jam/show', { jam: jam }) 
  });
};

// we create a jam with the title, then redirect to jam specific route
exports.save = function(req, res) {
  var newJam = new Jam({ title: req.body.title });

  newJam.save(function(err, jam) {
    res.redirect('/jam');
  });
};