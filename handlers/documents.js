// Load the iniparser module
var iniparser = require('iniparser');
// Read the ini file and populate the content on the config object
var config = iniparser.parseSync('./config.ini');

exports.list = function(req, res){
	if (!req.params.type) {
		req.params.type = 'html';
	}
	if(req.params.type === 'html') {
      if(req.params.id === 'CCRS2013english') {	
		res.writeHead(303, {
             'Location': 'http://www.act.org/standard/planact/english/index.html'
        });
      }
      if(req.params.id === 'CCRS2013writing') {	
  		res.writeHead(303, {
               'Location': 'http://www.act.org/standard/planact/writing/index.html'
          });
      }
      if(req.params.id === 'CCRS2013reading') {	
  		res.writeHead(303, {
               'Location': 'http://www.act.org/standard/planact/reading/index.html'
          });
      } 
      if(req.params.id === 'CCRS2013mathematics') {	
  		res.writeHead(303, {
               'Location': 'http://www.act.org/standard/planact/math/index.html'
          });
      } 
      if(req.params.id === 'CCRS2013science') {	
    		res.writeHead(303, {
                 'Location': 'http://www.act.org/standard/planact/science/index.html'
            });
      }         
      res.end();
      return;	
	}
	if(req.params.type === 'pdf') {	    	
      if(req.params.id === 'CCRS2013english') {	
        res.writeHead(303, {
          'Location': 'http://www.act.org/standard/pdf/english.pdf'
        });
      }
      if(req.params.id === 'CCRS2013reading') {	
          res.writeHead(303, {
            'Location': 'http://www.act.org/standard/pdf/reading.pdf'
          });
      }
      if(req.params.id === 'CCRS2013writing') {	
          res.writeHead(303, {
            'Location': 'http://www.act.org/standard/pdf/writing.pdf'
          });
      }
      if(req.params.id === 'CCRS2013mathematics') {	
          res.writeHead(303, {
            'Location': 'http://www.act.org/standard/pdf/math.pdf'
          });
      } 
      if(req.params.id === 'CCRS2013science') {	
          res.writeHead(303, {
            'Location': 'http://www.act.org/standard/pdf/science.pdf'
          });
      }            
      res.end();
      return;
	}
    if(req.params.type === 'csv') {		  
          res.writeHead(303, {
           'Location': 'https://s3.amazonaws.com/s3-act-bucket/ccrs/D'+ req.params.id + '.csv'
          });		  
		  
	      res.end();
	      return;
	}
	if(req.params.type === 'rdf') {
		    res.writeHead(303, {
		      'Location': 'https://s3.amazonaws.com/s3-act-bucket/ccrs/D'+ req.params.id + '.xml'
		    });		  
	      res.end();
	      return;
	}   
	if(req.params.type === 'json') {
		    res.writeHead(303, {
		      'Location': 'https://s3.amazonaws.com/s3-act-bucket/ccrs/D'+ req.params.id + '.json'
		    });		  
	      res.end();
	      return;
	}   	
	res.render('sd', {
      title : config.title,
      id : req.params.id,
      type : req.params.type
    });
};