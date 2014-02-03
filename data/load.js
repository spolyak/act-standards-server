// Load script
// mongo localhost/act-standards-db load.js 
//
print("Loading the CCRS data.");

print("Clearing existing database of standards.");
db.standards.remove();

print("Loading math...");

cursor = db.standards.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}
