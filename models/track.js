var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var trackSchema = new Schema({
	owner: String,
  title:  String,
  recordingId: String
});

module.exports = mongoose.model('Track', trackSchema);