var sm = require('../models/standards');
var StandardsModel = sm.StandardsModel;

exports.json = function(req, res) {
	StandardsModel.find({}, function(err, docs) {
		StandardsModel.findOne({
			uri : new RegExp(req.params.id + '$', "")
		}, function(err, sd) {
			if (!err) {
				sd = loadChildren(sd, docs);
				res.send(sd);
			} else {
				if ('CastError' === err.name && 'ObjectId' === err.type) {
					return res.status(404).send();
				} else {
					return res.status(500).send(err);
				}
			}
		});
	});
};

function loadChildren(source, docs) {
	var children = source.children;
	source.children = [];
	for (var i = 0; i < children.length; i++) {
		for (var j = 0; j < docs.length; j++) {
			if (docs[j]._id.equals(children[i])) {
				var child = loadChildren(docs[j], docs);
				source.children.push(child);
			}
		}
	}
	return source;
}
