// This is where the work for changing csv to json and validation can live.  Call from mainController
var json2csv = require('json2csv');
var fs = require('fs');
var stringify = require('csv-stringify');

var makeJsonArray = function(json, options) {
console.log("INSIDE makeJsonArray");
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
	var fields = ['Keys'];
	var fieldNames = ['Keys'] // This is the column headers (top row)
	for (var key in options) {
		if (options[key]) {
			fields.push(key);
			fieldNames.push(key);
		}
	}
	var data = json2csv({ data: json, fields: fields, fieldNames: fieldNames });
	return data;	
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