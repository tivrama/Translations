var mainControl = require('./mainController.js');
var toolKit = require('../middleware/toolKit.js');

module.exports = function (app) {

  app.route('/entry')

    // // Add entry to db
    // .post(function (req, res) {
    //   // Add the entry to the database
    //   mainControl.addEntry(req.body, function(err, entry) {
    //     if (err) {
    //       res.status(500).send(err);
    //     } else {
    //       res.status(201).send(entry);
    //     }
    //   });
    // })

    // Add entry to db
    .post(function (req, res) {
      // Add the entry to the database
      mainControl.addEntry(req.body, function(err, entry) {
        if (err) {
          res.status(500).send(err);
        } else {
          // Convert json to csv -> this will be one column with json keys, and a column for each language
          var data = toolKit.convertJsonToCSV(req.body.jsonFile, req.body.optionsFile);
          var customerCSVfile = req.body.customer + '.csv';
          res.attachment(customerCSVfile);
          res.status(201).send(data);
        }
      });
    })




    // Updtate a specific entry
    .put(function (req, res) {
      mainControl.updateEntry(req.body, function (err, entry) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(entry);
        }
      });
    })
    // Get entry for the given customer
    .get(function (req, res) {
      mainControl.getEntry(req.query, function (err, entry) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(entry);
        }
      });
    })
    // Delete a specific entry
    .delete(function (req, res) {
      mainControl.deleteEntry(req.body, function (err, entry) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(entry);
        }
      });
    });

};
