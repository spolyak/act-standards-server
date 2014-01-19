/**
 * Standards model
 */

var mongoose = require('mongoose');

var standardsSchema = mongoose.Schema({
	uri : String,
	type : String, // e.g. Statement
	jurisdiction : String,
	title : String,
	date_valid : String,
	publication_status : String,
	date_copyright : String,
	author : String,
	publisher : String,
	rights : String,
	description : String,
	subject : String,
	education_level : String,
	score_range : String,
	authority_status : String,
	statement_notation : String,
	statement_label : String,
	list_id : String,
	local_subject : String,
	comment : String,
	is_part_of : String,
	is_version_of : String,
	exact_match : String,
	concept_term : String,
	alt_statement_notation : String,
	is_child_of : String,
	has_child : String,
	indexing_status : String,
	creator : String,
	created : String
});

exports.StandardsModel = mongoose.model('standards', standardsSchema);