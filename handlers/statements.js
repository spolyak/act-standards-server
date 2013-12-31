// Load the iniparser module
var iniparser = require('iniparser');
// Read the ini file and populate the content on the config object
var config = iniparser.parseSync('./config.ini');

exports.list = function(req, res){
	if (!req.params.type) {
		req.params.type = 'html';
	}
	res.render('s', {
		title : config.title,
		id : req.params.id,
		type : req.params.type
	});
};