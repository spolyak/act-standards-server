var mongoose = require('mongoose');

// Load the iniparser module
var iniparser = require('iniparser');
// Read the ini file and populate the content on the config object
var config = iniparser.parseSync('./config.ini');

exports.index = function(req, res) {
	res.render('index', {
		title : config.title,
		message : config.index_message
	});
};