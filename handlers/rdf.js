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

	/*
	 * <asn:jurisdiction
	 * rdf:resource="http://purl.org/ASN/scheme/ASNJurisdiction/AL"/> <dc:title
	 * xml:lang="en-US">Alabama Course of Study: English Language Arts</dc:title>
	 * <dcterms:description xml:lang="en-US"> The 2010 Alabama Course of Study:
	 * English Language Arts presents a sound curriculum designed to prepare
	 * students for the English language arts demands in both college studies
	 * and career opportunities. Local school system teachers and administrators
	 * will find this document to contain a challenging set of content standards
	 * for students at each grade level. I encourage each system to use this
	 * document to develop local curriculum guides that determine how students
	 * will achieve these standards and perhaps go beyond them.
	 * </dcterms:description> <dcterms:source
	 * rdf:resource="https://docs.alsde.edu/documents/54/1%202010%20Alabama%20English%20Language%20Arts%20Course%20of%20Study.pdf"/>
	 * <asn:publicationStatus
	 * rdf:resource="http://purl.org/ASN/scheme/ASNPublicationStatus/Published"/>
	 * <asn:repositoryDate
	 * rdf:datatype="http://purl.org/dc/terms/W3CDTF">2013-08-19</asn:repositoryDate>
	 * <dcterms:valid rdf:datatype="http://purl.org/dc/terms/W3CDTF">2010</dcterms:valid>
	 * <dcterms:tableOfContents
	 * rdf:resource="http://asn.jesandco.org/resources/D2505664/manifest.json"/>
	 * <dcterms:subject
	 * rdf:resource="http://purl.org/ASN/scheme/ASNTopic/english"/>
	 * <dcterms:educationLevel
	 * rdf:resource="http://purl.org/ASN/scheme/ASNEducationLevel/K"/>
	 * <dcterms:educationLevel
	 * rdf:resource="http://purl.org/ASN/scheme/ASNEducationLevel/1"/>
	 * <dcterms:educationLevel
	 * rdf:resource="http://purl.org/ASN/scheme/ASNEducationLevel/2"/>
	 * <dcterms:educationLevel
	 * rdf:resource="http://purl.org/ASN/scheme/ASNEducationLevel/3"/>
	 * <dcterms:educationLevel
	 * rdf:resource="http://purl.org/ASN/scheme/ASNEducationLevel/4"/>
	 * <dcterms:educationLevel
	 * rdf:resource="http://purl.org/ASN/scheme/ASNEducationLevel/5"/>
	 * <dcterms:educationLevel
	 * rdf:resource="http://purl.org/ASN/scheme/ASNEducationLevel/6"/>
	 * <dcterms:educationLevel
	 * rdf:resource="http://purl.org/ASN/scheme/ASNEducationLevel/7"/>
	 * <dcterms:educationLevel
	 * rdf:resource="http://purl.org/ASN/scheme/ASNEducationLevel/8"/>
	 * <dcterms:educationLevel
	 * rdf:resource="http://purl.org/ASN/scheme/ASNEducationLevel/9"/>
	 * <dcterms:educationLevel
	 * rdf:resource="http://purl.org/ASN/scheme/ASNEducationLevel/10"/>
	 * <dcterms:educationLevel
	 * rdf:resource="http://purl.org/ASN/scheme/ASNEducationLevel/11"/>
	 * <dcterms:educationLevel
	 * rdf:resource="http://purl.org/ASN/scheme/ASNEducationLevel/12"/>
	 * <dcterms:language
	 * rdf:resource="http://id.loc.gov/vocabulary/iso639-2/eng"/> <gemq:hasChild
	 * rdf:resource="http://asn.jesandco.org/resources/S2505665"/>
	 * <gemq:hasChild
	 * rdf:resource="http://asn.jesandco.org/resources/S2505680"/>
	 * <gemq:hasChild
	 * rdf:resource="http://asn.jesandco.org/resources/S2505785"/>
	 * <gemq:hasChild
	 * rdf:resource="http://asn.jesandco.org/resources/S2505900"/>
	 * <gemq:hasChild
	 * rdf:resource="http://asn.jesandco.org/resources/S2505973"/>
	 * <gemq:hasChild
	 * rdf:resource="http://asn.jesandco.org/resources/S2506008"/>
	 * <gemq:hasChild
	 * rdf:resource="http://asn.jesandco.org/resources/S2506043"/>
	 * <gemq:hasChild
	 * rdf:resource="http://asn.jesandco.org/resources/S2506058"/>
	 * <gemq:hasChild
	 * rdf:resource="http://asn.jesandco.org/resources/S2506300"/>
	 * <gemq:hasChild
	 * rdf:resource="http://asn.jesandco.org/resources/S2506364"/>
	 * <gemq:hasChild
	 * rdf:resource="http://asn.jesandco.org/resources/S2506373"/>
	 * <gemq:hasChild
	 * rdf:resource="http://asn.jesandco.org/resources/S2506482"/>
	 * <gemq:hasChild
	 * rdf:resource="http://asn.jesandco.org/resources/S2506493"/>
	 * </asn:StandardDocument>
	 */
}
