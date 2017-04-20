var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
    console.log("start");
    exports.displayList();
    console.log("end");
  });

};

exports.isUrlInList = function(url, callback) {
  // var myReadStream = fs.createReadStream(exports.paths.list, 'utf8');
  // var body = "";
  // myReadStream.on('data', function(chunk) {
  //   body += chunk;
  // });
  // myReadStream.on ('end', function() {
  //   callback(body);
  // });
  exports.readListOfUrls(function(listDataArray){
    // if(listData.indexOf(url) < 0) {
    //   callback(false);
    // } else {
    //   callback(true);
    // }
    if (listDataArray.includes(url)) {
      callback(true)
    } else {
      callback(false);
    }

  });




};

exports.addUrlToList = function(url, callback) {
  
//   var fs = require('fs');

  fs.appendFile(exports.paths.list, url + '\n', function (err) {
     if (err) throw err;
     exports.displayList();
  });

  




  // var myWriteStream = fs.createWriteStream(exports.paths.list);
  // myWriteStream.write(url);
  // myWriteStream.write('\n');
  // myWriteStream.end();
  




  // var myWriteStream = fs.createWriteStream(exports.paths.list, 'utf8');
  // myWriteStream.write(url);
  // myWriteStream.on("end",function(){
  //   //callback();
  //   console.log("I am writing into the file " + url)
  // })

  // fs.writeFile(url,function(err){
  //   console.log(err);
  // })
  // console.log("I have done writing to file " + url)

};
 
exports.isUrlArchived = function(url, callback) {
	var completeUrl = exports.paths.archivedSites + "/" + url;
  fs.exists(completeUrl,function(exists){
    callback(exists);
	});
};

exports.downloadUrls = function(urls) {
};



exports.displayList = function() {
  var myReadStream = fs.createReadStream(exports.paths.list, 'utf8');
  var body = "";

  myReadStream.on('data', function(chunk) {
    body += chunk
  });
  myReadStream.on ('end', function() {
    console.log(body);
  });
};