var mongoose = require('mongoose');
StandardsModel = mongoose.model('StandardsModel');
//Load the iniparser module
var iniparser = require('iniparser');
// Read the ini file and populate the content on the config object
var config = iniparser.parseSync('./config.ini');

exports.index = function(req, res){
	StandardsModel.find({}, function (err, standards) {
        var standardsMap = {};
        standards.forEach(function(standard) {
          standardsMap[standard._id] = standard;
        });
        console.log(standardsMap);
        res.render('library', {
            title : config.title,
            message : config.index_message,
            standardsMap : standardsMap
        });
	});    
};