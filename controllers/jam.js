var Jam = require('../models/jam');

// list all existing jams?
exports.index = function(req, res) {
  Jam.find({}, function(err, jams) {
    res.render('jam/list', { jams: jams });  
  });
};

// return a form for creating a new jam
exports.create = function(req, res) {
  res.render('jam/create');
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
  var newJam = new Jam({ 
    title: req.body.title,
    desc: req.body.desc,
    spotifyId: req.body.spotify
  });

  newJam.save(function(err, jam) {
    res.redirect('/jam');
  });
};

// search for a file with a spotify song
exports.search = function(req, res) {
  res.render('jam/search');
};

// return search results for a given spotify id
exports.searchResult = function(req, res) {
  Jam.find({spotifyId: req.params.id }, function(err, jams) {
    res.json({ jams: jams });
  });
}
