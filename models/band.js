var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BandSchema = new Schema({
	name: String,
	desc: String,
	owner: { type: Schema.ObjectId, ref: 'User' },
	members: [{ type: Schema.ObjectId, ref: 'User'}],
	jams: [{ type: Schema.ObjectId, ref: 'Jam' }]
});

module.exports = mongoose.model('Band', BandSchema);