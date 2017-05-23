// This is where the work for changing csv to json and validation can live.  Call from mainController
var fs = require('fs');
var parse = require('csv-parse');

var makeJsonArray = function(json, options) {
	// Count the number of languages in options, and duplicate the json for each one, and push to an array.
	var jsonFileArray = [];
	for (var key in options) {
		if (options[key]) {
			jsonFileArray.push(json);
		}
	}
	jsonFileArray = JSON.stringify(jsonFileArray);
	return jsonFileArray;
};


var convertJsonToCSV = function(json, options) {
	// Make column names - these are the languages from options
	var fieldNames = ['Keys'] // This is the column headers (top row)
	for (var key in options) {
		// This if statement removes any null or undefined languages
		if (options[key]) {
			fieldNames.push(key);
		}
	}
	// Clear existing file
	fs.writeFile('formList.csv', '', function(){console.log('done')})
	// Write the column headers
	fs.writeFile('formList.csv', fieldNames, 'utf8', function (err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		}
	});
	// Append key and values to the body of the CSV
	for (var jsonKey in json) {
		// If the value contains a ",", then appendFile makes a new cell.  So we need to remove the ","
		if (json[jsonKey].indexOf(',') > -1) {
			// Replace "," with " - "
			json[jsonKey] = json[jsonKey].replace(/,/gi, " - ");
		}
		// Make key-value pair.  Put in '\n' for a new row before each pair
		var keyValuePair = ['\n' + jsonKey, json[jsonKey]];
		// Add the ke-value pairs to the csv file
		fs.appendFile('formList.csv', keyValuePair, 'utf8', function (err) {
			if (err) {
				console.log('Some error occured - file either not saved or corrupted file saved.', err);
			}
		});
	}
};




var convertCSVToJson = function(csv) {
	// var jsonarray = parse(csv, function(err, array) {
	// 	if (err) {
	// 		console.log('Error in converting CSV to JSON', err)
	// 	}
	// 	return array;
	// });
	// return jsonarray[0];
}

module.exports = {
  makeJsonArray: makeJsonArray,
  convertJsonToCSV: convertJsonToCSV,
  convertCSVToJson: convertCSVToJson
};