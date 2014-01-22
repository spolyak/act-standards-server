var sm = require('../models/standards');
var StandardsModel = sm.StandardsModel;

// Load the iniparser module
var iniparser = require('iniparser');
// Read the ini file and populate the content on the config object
var config = iniparser.parseSync('./config.ini');

exports.list = function(req, res) {

	StandardsModel.findOne({
		uri : new RegExp('S' + req.params.id + '$', "")
	}, function(err, standard) {
		if (!err && standard !== null) {
			if (!req.params.type ) {
				req.params.type = 'html';
			}
			res.render('s', {
				title : config.title,
				id : req.params.id,
				type : req.params.type,
				standard : standard,
				children : standard.has_child.split(',')
			});
		} else {
			if (err === null) {
				return res.status(404).send();
			} else {
				return res.status(500).send(err);
			}
		}
	});

};