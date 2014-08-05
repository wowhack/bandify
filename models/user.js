var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	
  name: String
  spotify: String
  tracks: { type: Array, "default": [] }

});

module.exports = mongoose.model('User', userSchema);