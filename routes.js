// Load the route handlers
var routes = require('./handlers');
var library = require('./handlers/library');
var documents = require('./handlers/documents');
var statements = require('./handlers/statements');
var data = require('./handlers/data');
var rdf = require('./handlers/rdf');
//apis
var statementsApi = require('./handlers/statementsApi');

module.exports = function(app, apiContext) {

  //routes
  app.get('/', routes.index);
  app.get('/library', library.index);
  app.get('/resources/D:id.:type?', documents.list);
  app.get('/resources/S:id.:type?', statements.list);
  app.get('/data/:id', data.json);
  app.get('/rdf/:id', rdf.xml);
  
  //api routes
  app.get(apiContext + 'statements', statementsApi.list);
  app.post(apiContext + 'statements', statementsApi.create);
  app.get(apiContext + 'statements/:id', statementsApi.show);
  app.delete(apiContext + 'statements/:id', statementsApi.destroy);
  app.put(apiContext + 'statements/:id', statementsApi.update);
  
};