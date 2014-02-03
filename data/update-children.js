// Load script
// mongo localhost/act-standards-db load.js 
// printjson(standard);
print("Updating the CCRS data.");

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, "");
};

db.standards.update({}, {
	$set : {
		"children" : []
	}
}, {
	upsert : false,
	multi : true
});
db.standards.ensureIndex({
	children : 1
});
cursor = db.standards.find();
while (cursor.hasNext()) {
	var standard = cursor.next();
	if (standard.has_child && standard.has_child.trim() !== '') {
		var children = standard.has_child.split(',');
		for (var i = 0, length = children.length; i < length; i++) {
			var childURI = children[i].trim();
			print("Linking " + standard.uri + " --> " + childURI);
			var child = db.standards.findOne({
				uri : childURI
			});
			db.standards.update({
				_id : standard._id
			}, {
				$push : {
					children : child._id
				}
			});
		}

	}
}
