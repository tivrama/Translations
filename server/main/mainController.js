var Main = require('./mainModel.js');

module.exports = {

//ENTRIES
  // the input is the customerFileName, which in this case will be the parent of the jsonFiles we want
  getEntry: function (customerFileName) {
    // find the json file with the given customerFileName and return it
    return Main.Entry.find(customerFileName, function (err, jsonFile) {
      if (err) {
        console.log('err in controller getEntries fn: ', err);
        return err;
      }
      return jsonFile;
    });
  },

  addEntry: function (data) {
    // create a new entry from the model
    var newEntry = Main.Entry({
      customer: data.customer,
      jsonFile: data.jsonFile,
    });
    
    newEntry.save(function (err, savedEntry) {
      if (err) {
        console.log('err in controller addEntry fn: ', err);
        return err;
      }
      console.log('Success saving entry to db: ', savedEntry);
    });
  },

  updateEntry: function (entry, next) {
    console.log('Inside updateEntry Controller: ', entry);
    var query = { _id: entry._id };
    var update = {
      jsonFile: entry.jsonFile
    };
    return Main.Entry.update(query, update, function (err, success) {
      if (err) {
        next(err);
        console.log('err in controller updateEntry fn: ', err);
        return;
      }
      next(success);
      console.log('success: ', success);
      return;
    });
  },

  deleteEntry: function (entry, next) {
    console.log('Inside deleteEntry Controller: ', entry);
    var query = { _id: entry._id };

    return Main.Entry.remove(query, function (err) {
      if (err) {
        console.log('err in controller deleteEntry fn: ', err);
        next(err);
        return;
      } else {
        console.log('Success deleting entry');
        next();
        return;
      }
    });
  },

};
