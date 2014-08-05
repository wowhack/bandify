var Track = require('../models/track.js');

exports.index = function(req, res) {
  Track.find({}, function(err, docs) {
    res.render('track/index', {tracks: docs});
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

    res.redirect('/tracks/' + product._id);
  });
}

exports.show = function(req, res) {
  Track.findOne({_id:req.params.id}, function(err, doc) {
    res.render('track/show', {track:doc});
  });
}