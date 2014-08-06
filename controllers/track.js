var Track = require('../models/track.js');

exports.index = function(req, res) {
  Track.find({}, function(err, docs) {

    if(req.user) {
      var userTracks = [];

      docs.forEach(function(track) {
        if(track.owner == req.user.id)
          userTracks.push(track);
      })
    }

    res.render('track/index', {tracks: docs, userTracks: userTracks});
  });
}

exports.create = function(req, res) {
  res.render('track/create');
}

exports.save = function(req, res) {

  var newTrack = new Track({
    owner: req.user.id,
    title: req.body.title,
    recordingId: app.get('r_id')
  });

  newTrack.save(function(err, product) {

    if (err) {
      console.error(err);
    }

    res.redirect('/jam/' + app.get('currentJam'));
  });
}

exports.show = function(req, res) {
  Track.findOne({_id:req.params.id}, function(err, doc) {
    res.render('track/show', {track:doc});
  });
}