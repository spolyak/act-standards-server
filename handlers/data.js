var sm = require('../models/standards');
var async = require('async');
var StandardsModel = sm.StandardsModel;

var doc = {};
var results = [];
var tArr = [];

exports.json = function(req, res) {

	StandardsModel.findOne({
		uri : new RegExp(req.params.id + '$', "")
	}, function(err, sd) {
		if (!err) {

			var children = sd.children;
			sd.children = [];
			var foo = [];
			if(children) {
				  async.forEach(children, processEachChild, afterAllChildren);

				  function processEachChild(child, callback) {
				    console.log(child);
				    StandardsModel.findOne({'_id': child}, function(err,res) {
				      tArr.push(res); 
				      //console.log(res);
				      callback(err);
				    });
				  }

				  function afterAllChildren(err) {
				    console.log("woo " +tArr);
				    sd.children = tArr;
				    res.send(sd);
				  }
			}
		} else {
			if ('CastError' === err.name && 'ObjectId' === err.type) {
				return res.status(404).send();
			} else {
				return res.status(500).send(err);
			}
		}
	});
};
