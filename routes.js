// Load the route handlers
var routes = require('./handlers');
var library = require('./handlers/library');
var documents = require('./handlers/documents');
var statements = require('./handlers/statements');

module.exports = function(app) {

  //routes
  app.get('/', routes.index);
  app.get('/library', library.index);
  app.get('/resources/D:id.:type?', documents.list);
  app.get('/resources/S:id.:type?', statements.list);

};