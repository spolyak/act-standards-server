var utility = require('../utility');
var sm = require('../models/standards');
var StandardsModel = sm.StandardsModel;

exports.list = function(req, res) {

	StandardsModel.find(function(err, statements) {
		if (!err) {
					  
			var jwt = req.headers['x-jwt-assertion'];
			console.log(req.headers);
			if(jwt) {
				var jwtinfo = jwt.split('.');
				return res.status(200).send(statements + new Buffer(jwtinfo[1], 'base64'));				
			} else {
				return res.status(200).send(statements);
			}

		} else {
			return res.status(500).send(err);
		}
	});
};

exports.create = function(req, res) {
	var statement;

	statement = new StandardsModel({
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		birthDate : req.body.birthDate
	});

	statement.save(function(err) {
		if (!err) {
			res.setHeader('Location', req.protocol + "://" + req.headers.host
					+ req.url + (utility.endsWith(req.url, '/') ? "" : "/")
					+ statement._id);
			res.status(201).send(statement);
		} else {
			res.status(500).send(err);
		}
	});
};

exports.show = function(req, res) {
	StandardsModel.findById(req.params.id, function(err, statement) {
		if (!err) {
			return res.status(200).send(statement);
		} else {
			if ('CastError' === err.name && 'ObjectId' === err.type) {
				return res.status(404).send();
			} else {
				return res.status(500).send(err);
			}
		}
	});
};

exports.destroy = function(req, res) {

	StandardsModel.findById(req.params.id, function(err, statement) {
		if (err || statement === null) {
			return res.status(404).send();
		}
		statement.remove(function(err) {
			if (!err) {
				return res.status(204).send();
			} else {
				return res.status(500).send(err);
			}
		});
	});
};

exports.update = function(req, res) {
	StandardsModel.findById(req.params.id, function(err, statement) {
		statement.firstName = req.body.firstName,
				statement.lastName = req.body.lastName,
				statement.birthDate = req.body.birthDate;

		if (err || statement === null) {
			return res.status(404).send();
		}
		statement.save(function(err) {
			if (!err) {
				return res.status(200).send(statement);
			} else {
				if ('CastError' === err.name && 'ObjectId' === err.type) {
					return res.status(404).send();
				} else {
					return res.status(500).send(err);
				}
			}
			return res.send(statement);
		});
	});
};
