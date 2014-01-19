var sm = require('../models/standards');
var StandardsModel = sm.StandardsModel;

// Load the iniparser module
var iniparser = require('iniparser');
// Read the ini file and populate the content on the config object
var config = iniparser.parseSync('./config.ini');

exports.list = function(req, res){
	
	StandardsModel.findById(req.params.id, function(err,
			standard) {
		if (!err) {
			if (!req.params.type) {
				req.params.type = 'html';
			}
			res.render('s', {
				title : config.title,
				id : req.params.id,
				type : req.params.type,
				standard: standard
			});
		} else {
			if ('CastError' === err.name && 'ObjectId' === err.type) {
				return res.status(404).send();
			} else {
				return res.status(500).send(err);
			}
		}
	});
	
	
};