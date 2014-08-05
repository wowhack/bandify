var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var jamSchema = new Schema({
  title:  String
});

module.exports = mongoose.model('Jam', jamSchema);
