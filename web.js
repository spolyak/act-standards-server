var http = require('http');
var express = require('express');
var app = express();
var apiContext = '/api/rest/v0.1/';

//Load the iniparser module
var iniparser = require('iniparser');
// Read the ini file and populate the content on the config object
var config = iniparser.parseSync('./config.ini');

//mongo setup
var mongoose = require('mongoose/');
var mongourl;

//cloud foundry
if(process.env.VCAP_SERVICES){
   var svcs = JSON.parse(process.env.VCAP_SERVICES);
   mongourl = svcs['mongodb'][0].credentials.uri;
}
else{
	//heroku
	if(process.env.MONGOHQ_URL) {
		mongourl = process.env.MONGOHQ_URL;
	} else {
     //running locally or not on cloud foundry
     mongourl = 'mongodb://localhost/act-standards-db'; 
	}
}
mongoose.connect(mongourl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
}); 

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

var routes = require('./routes')(app,apiContext);

http.createServer(app).listen(process.env.PORT || config.port, function() {
	console.log('ACT Standards Server started, mongourl: ' + mongourl + ' port is: ' + (process.env.PORT || config.port) );
});
