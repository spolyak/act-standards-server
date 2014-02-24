var XMLWriter = require('xml-writer');
var sm = require('../models/standards');
var StandardsModel = sm.StandardsModel;

var standards = [];

exports.xml = function(req, res) {

	StandardsModel.find({}, function(err, docs) {
		StandardsModel.findOne({
			uri : new RegExp(req.params.id + '$', "")
		}, function(err, sd) {
			if (!err) {
				loadStandards(sd, docs);
				xw = new XMLWriter;
				xw.startDocument();
				writeRdfTag(xw);
				writeDescripton(xw, req.params.id);
				writeDocument(xw, req.params.id, sd);
				for (var i = 0; i < standards.length; i++) {
					writeStandard(xw,standards[i]);
				}

				xw.endDocument();
				res.send(xw.toString());
			} else {
				if ('CastError' === err.name && 'ObjectId' === err.type) {
					return res.status(404).send();
				} else {
					return res.status(500).send(err);
				}
			}
		});
	});
};

function loadStandards(source, docs) {
	if (source) {
		var children = source.children;
		for (var i = 0; i < children.length; i++) {
			for (var j = 0; j < docs.length; j++) {
				if (docs[j]._id.equals(children[i])) {
					loadStandards(docs[j], docs);
					standards.push(docs[j]);
				}
			}
		}
	}
}

function writeRdfTag(xw) {
	xw.startElement('rdf:RDF');
	xw.writeAttribute('xmlns:asn', 'http://purl.org/ASN/schema/core/');
	xw.writeAttribute('xmlns:dc', 'http://purl.org/dc/elements/1.1/');
	xw.writeAttribute('xmlns:dcterms', 'http://purl.org/dc/terms/');
	xw.writeAttribute('xmlns:foaf', 'http://xmlns.com/foaf/0.1/');
	xw.writeAttribute('xmlns:gemq', 'http://purl.org/gem/qualifiers/');
	xw.writeAttribute('xmlns:loc', 'http://www.loc.gov/loc.terms/relators');
	xw.writeAttribute('xmlns:owl', 'http://www.w3.org/2002/07/owl#');
	xw.writeAttribute('xmlns:skos', 'http://www.w3.org/2004/02/skos/core#');
	xw.writeAttribute('xmlns:rdf',
			'http://www.w3.org/1999/02/22-rdf-syntax-ns#');
	xw.writeAttribute('xmlns:rdfs', 'http://www.w3.org/2000/01/rdf-schema#');
}

function writeDescripton(xw, id) {
	xw.startElement('rdf:Description');
	xw.writeAttribute('rdf:about',
			'http://act-standards-server.herokuapp.com/rdf/' + id);
	xw.startElement('foaf:primaryTopic');
	xw.writeAttribute('rdf:resource',
			'http://act-standards-server.herokuapp.com/rdf/' + id);
	xw.endElement();
	xw.startElement('dcterms:rightsHolder');
	xw
			.writeAttribute('rdf:datatype',
					'http://www.w3.org/2001/XMLSchema#string');
	xw.text('ACT, Inc.');
	xw.endElement();
	xw.startElement('dcterms:modified');
	xw.writeAttribute('rdf:datatype', 'http://www.w3.org/2001/XMLSchema#date');
	xw.text('2013');
	xw.endElement();
	xw.startElement('dcterms:created');
	xw.writeAttribute('rdf:datatype', 'http://www.w3.org/2001/XMLSchema#date');
	xw.text('2013');
	xw.endElement();
	xw.startElement('dc:creator');
	xw
			.writeAttribute('rdf:datatype',
					'http://www.w3.org/2001/XMLSchema#string');
	xw.text('ACT, Inc.');
	xw.endElement();
	xw.endElement();
}

function writeDocument(xw, id, sd) {
	xw.startElement('asn:StandardDocument');
	xw.writeAttribute('rdf:about',
			'http://act-standards-server.herokuapp.com/rdf/' + id);
	xw.startElement('asn:jurisdiction');
	xw.writeAttribute('rdf:resource', sd.jurisdiction);
	xw.endElement();
	xw.startElement('dc:title');
	xw.writeAttribute('xml:lang', 'en-US');
	xw.text(sd.title);
	xw.endElement();
	xw.startElement('dcterms:description');
	xw.writeAttribute('xml:lang', 'en-US');
	xw.text(sd.description);
	xw.endElement();
	xw.startElement('dcterms:source');
	xw.writeAttribute('rdf:resource', sd.uri);
	xw.endElement();
	xw.startElement('asn:publicationStatus');
	xw.writeAttribute('rdf:resource',
			'http://purl.org/ASN/scheme/ASNPublicationStatus/'
					+ sd.publication_status);
	xw.endElement();
	xw.startElement('asn:repositoryDate');
	xw.writeAttribute('rdf:datatype', 'http://purl.org/dc/terms/W3CDTF');
	xw.text('2013');
	xw.endElement();
	xw.startElement('dcterms:valid');
	xw.writeAttribute('rdf:datatype', 'http://purl.org/dc/terms/W3CDTF');
	xw.text(sd.date_valid);
	xw.endElement();
	xw.startElement('dcterms:tableOfContents');
	xw.writeAttribute('rdf:resource',
			'http://act-standards-server.herokuapp.com/data/' + id);
	xw.endElement();
	xw.startElement('dcterms:subject');
	xw.writeAttribute('rdf:resource', 'http://purl.org/ASN/scheme/ASNTopic/'
			+ sd.subject.toLowerCase());
	xw.endElement();
	xw.startElement('dcterms:language');
	xw.writeAttribute('rdf:resource',
			'http://id.loc.gov/vocabulary/iso639-2/eng');
	xw.endElement();

	var children = sd.has_child.split(",");
	for (var i = 0; i < children.length; i++) {
		xw.startElement('gemq:hasChild');
		xw.writeAttribute('rdf:resource', children[i]);
		xw.endElement();
	}

	xw.endElement();
}

function writeStandard(xw, s) {
	
	xw.startElement('asn:Statement');
	xw.writeAttribute('rdf:about', s.uri);
	xw.startElement('asn:authorityStatus');
	xw.writeAttribute('rdf:resource', 'http://purl.org/ASN/scheme/ASNAuthorityStatus/' + s.authority_status);
	xw.endElement();
	xw.startElement('dcterms:created');
	xw.writeAttribute('rdf:datatype', 'http://purl.org/dc/terms/W3CDTF');
	xw.text('2013');
	xw.endElement();
	xw.startElement('dcterms:isPartOf');
	xw.writeAttribute('rdf:resource', s.is_part_of);
	xw.endElement();
	xw.startElement('dcterms:creator');
	xw.writeAttribute('rdf:resource', s.uri);
	xw.endElement();	
	xw.startElement('dcterms:subject');
	xw.writeAttribute('rdf:resource', 'http://purl.org/ASN/scheme/ASNTopic/'
			+ s.subject.toLowerCase());
	xw.endElement();	
	xw.startElement('dcterms:description');
	xw.writeAttribute('xml:lang', 'en-US');
	xw.text(s.description);
	xw.endElement();	
	xw.startElement('dcterms:language');
	xw.writeAttribute('rdf:resource', 'http://id.loc.gov/vocabulary/iso639-2/eng');
	xw.endElement();	
	xw.startElement('dcterms:educationLevel');
	xw.writeAttribute('rdf:resource', 'http://purl.org/ACT/scheme/ACTScoreRange/' + s.score_range);
	xw.endElement();
	xw.startElement('gemq:isChildOf');
	xw.writeAttribute('rdf:resource', s.is_child_of);
	xw.endElement();
	var children = s.has_child.split(",");
	for (var i = 0; i < children.length; i++) {
		xw.startElement('gemq:hasChild');
		xw.writeAttribute('rdf:resource', children[i]);
		xw.endElement();
	}	
	
	xw.endElement();
}

