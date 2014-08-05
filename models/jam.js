var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JamSchema = new Schema({
  title:  String,
  owner:  {type: Schema.ObjectId, ref: 'User'},
  spotifyId:  String,
  password:  String,
  tracks:  [{type: Schema.ObjectId, ref: 'Track'}]
});

module.exports = mongoose.model('Jam', JamSchema);
