import csv, pymongo, sys
foo_db = pymongo.Connection("dbserver.mydomain.com").foo
csv_reader = csv.reader(open(sys.argv[1], 'rb'), delimiter=',', quotechar='"')
for line in csv_reader:
    _id, field1, field2 = line
    foo_db.my_collection.update({
        "_id": _id
    }, {
        "$set": { "field1": field1, "field2": field2 }
    }, safe=True)
