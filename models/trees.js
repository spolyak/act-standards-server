var mongoose = require('mongoose');

var treesSchema = mongoose.Schema({
	uri : String,
	name : String
});

exports.TreesModel = mongoose.model('trees', treesSchema);