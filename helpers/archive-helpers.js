var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  var myReadStream = fs.createReadStream(exports.paths.list, 'utf8');
  var body = "";

  myReadStream.on('data', function(chunk) {
    body += chunk
  });
  myReadStream.on ('end', function() {
    callback(body.split("\n"));
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(listDataArray){
    if (listDataArray.includes(url)) {
      callback(true)
    } else {
      callback(false);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  	fs.appendFile(exports.paths.list, url + '\n','utf8', function (err) {
	    if (err) {
	     	throw err;
	    } else {
	     	callback();
	    }
  	});
};
 
exports.isUrlArchived = function(url, callback) {
  	var completeUrl = exports.paths.archivedSites + "/" + url;
  	fs.exists(completeUrl,function(exists){
    	callback(exists);
	});
};

exports.downloadUrls = function(urls) {
	urls.forEach(function(eachUrl) {
		var file = fs.createWriteStream(exports.paths.archivedSites + '/' + eachUrl);
		http.get('http://' + eachUrl + '/index.html', function(res) {
	    	res.on('data', function(data) {
	            file.write(data);
	        }).on('end', function() {
	            file.end();
	        });
		})
	})
};

exports.downloadUrl = function(eachUrl) {
	var file = fs.createWriteStream(exports.paths.archivedSites + '/' + eachUrl);
	http.get('http://' + eachUrl + '/index.html', function(res) {
    	res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            file.end();
        });
	})
};

exports.displayList = function() {
  var myReadStream = fs.createReadStream(exports.paths.list, 'utf8');
  var body = "";
  myReadStream.on('data', function(chunk) {
    body += chunk
  });
  myReadStream.on ('end', function() {
  	console.log(exports.paths.list);
    console.log(body);
  });
};
