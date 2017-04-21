// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

	var urlsToBeDownloaded = [];

	archive.readListOfUrls(function(urls) { // all the urls in the list
		// use a forEach loop to check through every url on the list
		urls.forEach(function(eachUrl) {
			// check list, and then check archieve see if the same name dir exist or not
			archive.isUrlArchived(eachUrl, function(existArchived) {
				if(!existArchived) {
				// if the same name file exists, do nothing, 
				// start next loop and exam next item in the url array
					archive.downloadUrl(eachUrl);
				//run the downloadUrl function, and download the index.html file from the target website
				
				}
			})
		})
	});
	
