// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('./helpers/archive-helpers');


var workerAutomationScript =() =>{

	archive.readListOfUrls(function(urls) {
		archive.downloadUrl2(urls);	
	});
	// use a forEach loop to check through every url on the list

		// check list, and then check archieve see if the same name dir exist or not

			// if the same name dir exists, do nothing, 
			// start next loop and exam next item in the url array

			// if the same name dir does not exist, run the downloadUrl function, 
			// and download the index.html file from the target website
}