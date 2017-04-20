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
//   fs.readFile(FILE_LOCATION, function (err, data) {
//   if (err) throw err;
//   if(data.indexOf('search string') >= 0){
//    console.log(data)
//   }
// });
  // handle POST requests
  else if (req.method === 'POST') {
    var body = "";
    req.on('data', function(chunk) {
      body+=chunk;
    });
    req.on('end', function() {
      fileLocationUrl = body.split("=")[1]
      archive.isUrlInList(fileLocationUrl, function(isURL) {
        // if(listData.indexOf(fileLocationUrl) < 0) {
        //   archive.addUrlToList(fileLocationUrl, function(whatever) {
        //     console.log("succeeded");
        //   })
        // } else {
        //   console.log("file already exist!");
        // }
        if(!isURL){
          console.log(fileLocationUrl);
          console.log("url needs to be added to txt");
          archive.addUrlToList(fileLocationUrl,function(){
            //console.log("Appended the url to list")
          })
        }
      });

    })
  }


};