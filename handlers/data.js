var tm = require('../models/trees');
var TreesModel = tm.TreesModel;

var doc = {};
var results = [];

exports.json = function(req, res) {

	TreesModel.findOne({
		uri : new RegExp(req.params.id + '$', "")
	}, function(err, sd) {
		if (!err) {
			res.send(sd);
		} else {
			if ('CastError' === err.name && 'ObjectId' === err.type) {
				return res.status(404).send();
			} else {
				return res.status(500).send(err);
			}
		}
	});
};
