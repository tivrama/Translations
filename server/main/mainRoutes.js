var path = require('path');
var mainControl = require('./mainController.js');
var toolKit = require('../middleware/toolKit.js');
var fs = require('fs');

module.exports = function (app) {

  app.route('/entry')

    // Add entry to db
    .post(function (req, res) {
      // Add the entry to the database
      mainControl.addEntry(req.body, function(err, entry) {
        if (err) {
          res.status(500).send(err);
        } else {
          toolKit.convertJsonToCSV(req.body.jsonFile, req.body.optionsFile);
          var customerCSVfile = req.body.customer + '.csv';
          res.attachment(customerCSVfile)
          .status(201)
          .sendFile('formList.csv', { root: path.join(__dirname, '../../') })
        }
      });
    })

    // Updtate a specific entry
    .put(function (req, res) {
      // console.log('REQUEST: ', req)
      // console.log('REQUEST.QUERY(PARAMS): ', req.query)

      mainControl.updateEntry(req.query, function (err, entry) {
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
