var Band = require('../models/band');
var Jam = require('../models/jam');

exports.index = function(req, res) {
  Band.find({}, function(err, bands) {
    res.render('band/list', { bands: bands });  
  });
};

exports.create = function(req, res) {
  res.render('band/create');
};

exports.save = function(req, res) {
  console.log('req', req);
  var newBand = new Band({ 
    name: req.body.name,
    desc: req.body.desc,
    owner: req.user
  });

  newBand.save(function(err, band) {
    res.redirect('/band');
  });
};

exports.show = function(req, res) {
  Band.findOne({_id:req.params.id}, function(err, doc) {
    res.render('band/show', {band:doc});
  });
}

exports.delete = function(req, res) {
  var bandID = req.params.id;

  Band.findById(bandID, function(err, band) {
    band.remove();
    res.redirect('/band');
  })
}