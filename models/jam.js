var mongoose = require('mongoose');
var Track = require('./track.js')

var Schema = mongoose.Schema;

var JamSchema = new Schema({
  title:  String,
  desc: { type: String, default: '' },
  owner:  { type: Schema.ObjectId, ref: 'User' },
  spotifyId:  String,
  password:  String,
  tracks:  [{type: Schema.Types.ObjectId, ref: 'Track'}]
});

module.exports = mongoose.model('Jam', JamSchema);
