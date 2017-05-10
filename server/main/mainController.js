var Main = require('./mainModel.js');
var toolKit = require('../middleware/toolKit.js');


module.exports = {

  // Creates a new customer with their Name, jsonFile, Options, along with _id and creation date
  // Returns a csv string of the jsonFile array
  addEntry: function (data, next) {
    // An object with a stringified json array of jsonFiles (one for each language), and count of languages
    var jsonFileArray = toolKit.makeJsonArray(data.jsonFile, data.optionsFile);
    var stringifiedOptions = JSON.stringify(data.optionsFile);
    // Save to DB
    // create a new entry from the model
    var newEntry = Main.Entry({
      customer: data.customer,
      jsonFile: jsonFileArray,
      optionsFile: stringifiedOptions
    });
    
    // Save json and options to DB
    newEntry.save(function (err, success) {
      if (err) {
        console.log('err in controller addEntry: ', err);
        return next(err);
      }
      console.log('Success saving entry to db');
      return next(err, success);
    });
  },


  updateEntry: function (data, next) {
    console.log('Inside updateEntry Controller: ', data);
    var query = { customer: data.customer };
    var update = {
      jsonFile: data.jsonFile
    };
    Main.Entry.update(query, update, function (err, success) {
      if (err) {
        console.log('err in controller updateEntry fn: ', err);
        return next(err);
      }
      console.log('success: ', success);
      return next(err, success);
    });
  },


  // the input is the customerFileName, which in this case will be the parent of the jsonFiles we want
  getEntry: function (data, next) {
    var query = { customer: data.customer };
    // find the json file with the given data and return it
    Main.Entry.find(data, function (err, success) {
      if (err) {
        console.log('err in controller getEntries fn: ', err);
        return next(err);
      }
      return next(err, success);
    });
  },


  deleteEntry: function (data, next) {
    var query = { customer: data.customer };

    Main.Entry.remove(query, function (err, success) {
      if (err) {
        console.log('err in controller deleteEntry fn: ', err);
        return next(err);
      }
      console.log('Success deleting entry');
      return next(err, success);
    });
  },

};
