// Load the iniparser module
var iniparser = require('iniparser');
// Read the ini file and populate the content on the config object
var config = iniparser.parseSync('./config.ini');

exports.list = function(req, res){
	if (!req.params.type) {
		req.params.type = 'html';
	}
	if(req.params.id === 'CRSmathematics' && req.params.type === 'json') {
	  res.writeHead(303, {
	    'Location': 'https://s3.amazonaws.com/s3-act-bucket/crs/DCRSmathematics.json'
	  });
	  res.end();
	} else {
	  res.render('sd', {
		title : config.title,
		id : req.params.id,
		type : req.params.type
	  });
	}
};