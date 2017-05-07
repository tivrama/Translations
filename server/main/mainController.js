var Main = require('./mainModel.js');
var toolKit = require('../middleware/toolKit.js');

module.exports = {

  // Creates a new customer with their Name, jsonFile, Options, along with _id and creation date
  // Returns a csv string of the jsonFile array
  addEntry: function (data) {
    // A stringified json array of jsonFiles (one for each language)
    // var jsonFileArray = toolKit.makeJsonArray(data.json, data.options);
    return "hello world";
    // Save to DB
    // create a new entry from the model
    // var newEntry = Main.Entry({
    //   customer: data.customer,
    //   jsonFile: jsonFileArray,
    //   optionsFile: data.optionsFile
    // });

    // // Convert json to csv
    // var customerCSV = toolKit.convertJsonToCSV(jsonFileArray);
    
    // // Save json and options to DB
    // return newEntry.save(function (err, savedEntry) {
    //   if (err) {
    //     console.log('err in controller addEntry: ', err);
    //     return err;
    //   }
    //   console.log('Success saving entry to db: ', savedEntry.customer);
    //   return customerCSV;
    // });
  },


  updateEntry: function (entry) {
    console.log('Inside updateEntry Controller: ', entry);
    var query = { _id: entry._id };
    var update = {
      jsonFile: entry.jsonFile
    };
    return Main.Entry.update(query, update, function (err, success) {
      if (err) {
        console.log('err in controller updateEntry fn: ', err);
        return err;
      }
      console.log('success: ', success);
      return success;
    });
  },

  // the input is the customerFileName, which in this case will be the parent of the jsonFiles we want
  getEntry: function (customerFileName) {
    // find the json file with the given customerFileName and return it
    return Main.Entry.find(customerFileName, function (err, customerObj) {
      if (err) {
        console.log('err in controller getEntries fn: ', err);
        return err;
      }
      return customerObj;
    });
  },


  deleteEntry: function (entry) {
    console.log('Inside deleteEntry Controller: ', entry);
    var query = { _id: entry._id };

    return Main.Entry.remove(query, function (err, res) {
      if (err) {
        console.log('err in controller deleteEntry fn: ', err);
        return err;
      } else {
        console.log('Success deleting entry');
        return res;
      }
    });
  },

};
