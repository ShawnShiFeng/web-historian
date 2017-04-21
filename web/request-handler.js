var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // handle GET requests
  if (req.method === "GET") {
    // render index.html
    if (req.url === "/") {
      httpHelpers.serveAssets(res,"index.html",function(data){
        res.writeHead(200,httpHelpers.headers);
        res.end(data);
      })

  	}
    // handle non-home pages
    else {
      archive.isUrlArchived(req.url, function(exists) {
        if (exists) {
          httpHelpers.archivedSites(res, req.url, function(data) {
            res.writeHead(200,httpHelpers.headers);
            res.end(data);
          })
        }
        else {
          res.writeHead(404, httpHelpers.headers);
          res.end();
        }
      });
    }
  }

  else if (req.method === 'POST') {
    var body = "";
    req.on('data', function(chunk) {
      body+=chunk;
    });
    req.on('end', function() {
      fileLocationUrl = body.split("=")[1]
      archive.isUrlInList(fileLocationUrl, function(isURL) {
        if(!isURL){
          archive.addUrlToList(fileLocationUrl,function(){
          })
          // console.log("url is appended");
        } else {
        	// console.log("url already exist");
        }
          res.writeHead(302, httpHelpers.headers);
          res.end();
      });

    })
  }


};