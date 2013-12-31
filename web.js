var http = require('http');
var express = require('express');
var app = express();

// Load the iniparser module
var iniparser = require('iniparser');
// Read the ini file and populate the content on the config object
var config = iniparser.parseSync('./config.ini');

// Set the view engine
app.set('view engine', 'jade');
// Where to find the view files
app.set('views', './views');
// CSS, JS, images
app.use(express.static('./public'));
// Explicitly add the router middleware
app.use(app.router);
// Add the errorHander middleware
app.use(express.errorHandler());
// add dev level logging
app.use(express.logger('dev'));

// A route for the home page - will render a view
app.get('/', function(req, res) {
	res.render('index', {
		title : config.title,
		message : config.index_message
	});
});

//handle request ot view a document
app.get('/resources/D:id', function(req, res) {
	res.render('sd', {
		title : config.title,
		id : req.params.id
	});
});

//handle request to view a statement
app.get('/resources/S:id', function(req, res) {
	res.render('s', {
		title : config.title,
		id : req.params.id
	});
});


http.createServer(app).listen(process.env.PORT || config.port, function() {
	console.log('ACT Standards Server started');
});
