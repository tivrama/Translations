// This is where the work for changing csv to json and validation can live.  Call from mainController
var converter = require('json-2-csv');

var filterJson = function(json, options) {
	// TODO:  Get translations file and and notes on what to filter
	var filteredJson = '';

	return filteredJson;
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
  filterJson: filterJson,
  convertJsonToCSV: convertJsonToCSV,
  convertCSVToJson: convertCSVToJson
};