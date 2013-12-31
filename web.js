var http = require('http');
var express = require('express');
var app = express();

// Load the iniparser module
var iniparser = require('iniparser');
// Read the ini file and populate the content on the config object
var config = iniparser.parseSync('./config.ini');

//mongo setup
var mongoose = require('mongoose/');
var mongourl;

if(process.env.VCAP_SERVICES){
   //app is running in the cloud
   var svcs = JSON.parse(process.env.VCAP_SERVICES);
   mongourl = svcs['mongodb'][0].credentials.uri;
}
else{
   //running locally or not on cloud foundry
   mongourl = 'mongodb://localhost/act-standards-db'; 
};

mongoose.connect(mongourl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
}); 

var standardsSchema = mongoose.Schema({
    name: String
});
standardsSchema.methods.translate = function () {
	var greeting = this.name ? "Standard name is " + this.name : "I don't have a name";
	console.log(greeting);
};
var StandardsModel = mongoose.model('StandardsModel', standardsSchema);

//bootstrap in some mongo docs if necessary
StandardsModel.findOne({name: 'CCRS'}, function(err,obj) { if(obj) {console.log('found set CCRS');} else{var ccrs = new StandardsModel({ name: 'CCRS' }); ccrs.save(); } });
StandardsModel.findOne({name: 'CRS'}, function(err,obj) { if(obj) {console.log('found set CRS');} else {var crs = new StandardsModel({ name: 'CRS' }); crs.save(); } });

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
	
	StandardsModel.find({}, function (err, standards) {
        var standardsMap = {};
        standards.forEach(function(standard) {
          standardsMap[standard._id] = standard;
        });
        console.log(standardsMap);
        res.render('index', {
            title : config.title,
            message : config.index_message,
            standardsMap : standardsMap
        });
	});    
	
});

//handle request ot view a document
app.get('/resources/D:id.:type?', function(req, res) {
	if (!req.params.type) {
		req.params.type = 'html';
	}
	res.render('sd', {
		title : config.title,
		id : req.params.id,
		type : req.params.type
	});
});

//handle request to view a statement
app.get('/resources/S:id?.:type', function(req, res) {
	res.render('s', {
		title : config.title,
		id : req.params.id,
		type : req.params.type
	});
});


http.createServer(app).listen(process.env.PORT || config.port, function() {
	console.log('ACT Standards Server started');
});
