// This is where the work for changing csv to json and validation can live.  Call from mainController
var converter = require('json-2-csv');
var stringify = require('csv-stringify');

var makeJsonArray = function(json, options) {
	// Count the number of languages in options, and duplicate the json for each one, and push to an array.
	var jsonFileArray = [];
	options = JSON.parse(options);
	json = JSON.parse(json);
	for (var key in options) {
		if (options[key]) {
			jsonFileArray.push(json);
		}
	}
	return JSON.stringify(jsonFileArray);
};

var convertJsonToCSV = function(json) {
	var jsonarray = [json];
	return converter.json2csv(jsonarray, function(err, csv) {
		if (err) {
			console.log('Error in converting JSON to CSV', err)
		}
		return csv
	});
};

var convertCSVToJson = function(csv) {
	var jsonarray = converter.csv2json(csv, function(err, array) {
		if (err) {
			console.log('Error in converting CSV to JSON', err)
		}
		return array;
	});
	return jsonarray[0];
}

module.exports = {
  makeJsonArray: makeJsonArray,
  convertJsonToCSV: convertJsonToCSV,
  convertCSVToJson: convertCSVToJson
};