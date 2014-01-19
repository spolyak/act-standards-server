// Load the iniparser module
var iniparser = require('iniparser');
// Read the ini file and populate the content on the config object
var config = iniparser.parseSync('./config.ini');
var sm = require('../models/standards');
var StandardsModel = sm.StandardsModel;
var homelink = '';

exports.list = function(req, res) {
	if (!req.params.type) {
		req.params.type = 'html';
	}
	if (req.params.type === 'html') {

		if (req.params.id === 'CCRS2013english') {
			homelink = 'http://www.act.org/standard/planact/english/index.html';
		}
		if (req.params.id === 'CCRS2013writing') {
			homelink = 'http://www.act.org/standard/planact/writing/index.html';
		}
		if (req.params.id === 'CCRS2013reading') {
			homelink = 'http://www.act.org/standard/planact/reading/index.html';
		}
		if (req.params.id === 'CCRS2013mathematics') {
			homelink = 'http://www.act.org/standard/planact/math/index.html';
		}
		if (req.params.id === 'CCRS2013science') {
			homelink = 'http://www.act.org/standard/planact/science/index.html';
		}
	}
	if (req.params.type === 'pdf') {
		res.writeHead(303, {
			'Location' : 'https://s3.amazonaws.com/s3-act-bucket/ccrs/D'
					+ req.params.id + '.pdf'
		});

		res.end();
		return;
	}
	if (req.params.type === 'csv') {
		res.writeHead(303, {
			'Location' : 'https://s3.amazonaws.com/s3-act-bucket/ccrs/D'
					+ req.params.id + '.csv'
		});

		res.end();
		return;
	}
	if (req.params.type === 'rdf') {
		res.writeHead(303, {
			'Location' : 'https://s3.amazonaws.com/s3-act-bucket/ccrs/D'
					+ req.params.id + '.xml'
		});
		res.end();
		return;
	}
	if (req.params.type === 'json') {
		res.writeHead(303, {
			'Location' : 'https://s3.amazonaws.com/s3-act-bucket/ccrs/D'
					+ req.params.id + '.json'
		});
		res.end();
		return;
	}

	StandardsModel.findOne({
		uri : new RegExp('D' + req.params.id + '$', "")
	}, function(err, sd) {
		if (!err) {
			if (!req.params.type) {
				req.params.type = 'html';
			}
			res.render('sd', {
				title : config.title,
				id : req.params.id,
				type : req.params.type,
				homelink : homelink,
				sd : sd,
				children : sd.has_child.split(',')
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