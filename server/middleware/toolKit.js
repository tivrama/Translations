// This is where the work for changing csv to json and validation can live.  Call from mainController
var fs = require('fs');

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
		if (options[key]) {
			fieldNames.push(key);
		}
	}
	// Create the csv and write the column headers
	fs.writeFile('formList.csv', fieldNames, 'utf8', function (err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		}
	});
	// Append key and values to the body of the CSV
	for (var jsonKey in json) {
		if (json[jsonKey].indexOf(',') > -1) {
			json[jsonKey] = json[jsonKey].replace(/,/gi, "-");
		}

		var keyValuePair = ['\n' + jsonKey, json[jsonKey]]
		fs.appendFile('formList.csv', keyValuePair, 'utf8', function (err) {
			if (err) {
				console.log('Some error occured - file either not saved or corrupted file saved.');
			}
		});
	}
};




var convertCSVToJson = function(csv) {
	// var jsonarray = csv2json(csv, function(err, array) {
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