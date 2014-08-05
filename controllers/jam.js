var Jam = require('../models/jam');
var User = require('../models/user');

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
    User.findById(jam.owner, function(err, user) {
      var user = user;
      res.render('jam/show', { jam: jam, user: user })
    });
     
  });
};

exports.delete = function(req, res) {
  var jamID = req.params.id;

  Jam.findById(jamID, function(err, jam) {
    jam.remove();
    res.redirect('/jam');
  })
}

// we create a jam with the title, then redirect to jam specific route
exports.save = function(req, res) {
  console.log('req', req);
  var newJam = new Jam({ 
    title: req.body.title,
    desc: req.body.desc,
    spotifyId: req.body.spotify,
    owner: req.user
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
