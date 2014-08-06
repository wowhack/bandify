var Jam = require('../models/jam');
var User = require('../models/user');
var Track = require('../models/track');
var async = require('async');
var _ = require('lodash');

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

  async.parallel([
    function(cb) {
      Jam.findById(jamID).populate('tracks').exec(cb);
    },
    function(cb) {
      Track.find({}, cb);
    },
  ], function(err, results) {
    console.log(results);
    res.render('jam/show', {
      jam: results[0],
      tracks: results[1]
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
    lyrics: req.body.lyrics,
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
exports.searchSingleJam = function(req, res) {
  Jam.find({spotifyId: req.params.id }, function(err, jams) {
    res.json({ jams: jams });
  });
}

exports.searchMultipleJams = function(req, res) {
    var re = new RegExp(req.params.id, 'i');
    Jam.find({title: { $regex: re }}, function(err, jams) {
      res.json({ jams: jams });
    });
}

exports.getAll = function(req, res) {
  Jam.find({}, function(err, jams) {
    res.json({ jams: jams });  
  });
}

exports.addTrack = function(req, res) {
  Jam.update({_id: req.body.jamId}, {$push: {tracks: req.body.trackId}}, function(err, s) {
    if(err) console.error(err)
    res.send("Allt är gött");
  });
}