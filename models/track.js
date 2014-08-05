var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var trackSchema = new Schema({
  title:  String
});

module.exports = mongoose.model('Track', trackSchema);