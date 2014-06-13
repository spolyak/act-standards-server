var utility = require('../utility');
var sm = require('../models/standards');
var StandardsModel = sm.StandardsModel;

exports.list = function(req, res) {
	
	var descriptionRegex = new RegExp(req.query.description, 'i');
    var subjectRegex = new RegExp(req.query.subject, 'i');
	var query = StandardsModel.find({description: descriptionRegex, subject: subjectRegex}, { 'description': 1,  'subject': 1}).select('description subject uri');
	
	query.exec(function(err, statements) {
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
		uri : req.body.uri,
		type : req.body.type,
		jurisdiction : req.body.jurisdiction,
		title : req.body.title,
		date_valid : req.body.date_valid,
		publication_status : req.body.publication_status,
		date_copyright : req.body.date_copyright,
		author : req.body.author,
		publisher : req.body.publisher,
		rights : req.body.rights,
		description : req.body.description,
		subject : req.body.subject,
		education_level : req.body.education_level,
		score_range : req.body.score_range,
		authority_status : req.body.authority_status,
		statement_notation : req.body.statement_notation,
		statement_label : req.body.statement_label,
		list_id : req.body.list_id,
		local_subject : req.body.local_subject,
		comment : req.body.comment,
		is_part_of : req.body.is_part_of,
		is_version_of : req.body.is_version_of,
		exact_match : req.body.exact_match,
		concept_term : req.body.concept_term,
		alt_statement_notation : req.body.alt_statement_notation,
		is_child_of : req.body.is_child_of,
		has_child : req.body.has_child,
		indexing_status : req.body.indexing_status,
		creator : req.body.creator,
		created : req.body.created		
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
		statement.uri = req.body.uri,
		statement.type = req.body.type,
		statement.jurisdiction = req.body.jurisdiction,
		statement.title = req.body.title,
		statement.date_valid = req.body.date_valid,
		statement.publication_status = req.body.publication_status,
		statement.date_copyright = req.body.date_copyright,
		statement.author = req.body.author,
		statement.publisher = req.body.publisher,
		statement.rights = req.body.rights,
		statement.description = req.body.description,
		statement.subject = req.body.subject,
		statement.education_level = req.body.education_level,
		statement.score_range = req.body.score_range,
		statement.authority_status = req.body.authority_status,
		statement.statement_notation = req.body.statement_notation,
		statement.statement_label = req.body.statement_label,
		statement.list_id = req.body.list_id,
		statement.local_subject = req.body.local_subject,
		statement.comment = req.body.comment,
		statement.is_part_of = req.body.is_part_of,
		statement.is_version_of = req.body.is_version_of,
		statement.exact_match = req.body.exact_match,
		statement.concept_term = req.body.concept_term,
		statement.alt_statement_notation = req.body.alt_statement_notation,
		statement.is_child_of = req.body.is_child_of,
		statement.has_child = req.body.has_child,
		statement.indexing_status = req.body.indexing_status,
		statement.creator = req.body.creator,
		statement.created = req.body.created;	

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
