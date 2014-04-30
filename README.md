# act-standards-server [ ![Codeship Status for spolyak/act-standards-server](https://www.codeship.io/projects/45dee0e0-53ef-0131-d4bd-365fed591f21/status?branch=master)](https://www.codeship.io/projects/11534) [![Build Status](https://travis-ci.org/spolyak/act-standards-server.png?branch=master)](https://travis-ci.org/spolyak/act-standards-server)

## Objective
This project is designed to provide HTML and REST service access to published ACT services.


## Usage
* /api/rest/v0.1/statments (GET) Fetch all statements
* /api/rest/v0.1/statments?description=triangle&subject=\{mathematics,reading,english,writing\} (GET) Search for statements based on description and/or subject
* /api/rest/v0.1/statments (POST) Publish all statments
* /api/rest/v0.1/statments/{id} (GET) Fetch one statement by id
* /api/rest/v0.1/statments/{id} (PUT) Update statement
* /api/rest/v0.1/statments/{id} (DELETE) Remove a statement

## Developing
* Using Node.js, express/jade, and mongo
* mongo -u heroku -p password dharma.mongohq.com:port/appname 
* mongoimport --username heroku --password password --host dharma.mongohq.com:port --db appname --collection standards --type csv --file ./writing.csv --headerline
* make sure using LF on csv
* mongoimport --db act-standards-db --collection trees --jsonArray < writing-tree.json
* mongo localhost:27017/test update-children.js

Created with [Nodeclipse v0.4](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   
