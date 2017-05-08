var mainControl = require('./mainController.js');
var Promise = require('bluebird');
Promise.promisify(mainControl.addEntry);

module.exports = function (app) {

  app.route('/entry')
    // Add entry to db
    .post(function (req, res) {
      // Add the entry to the database
      mainControl.addEntry(req.body, function(err, entry) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send(entry);
          }
      });
    })
    // Get entry for the given customer
    .get(function (req, res) {
      mainControl.getEntry(req).then(function (entry) {
        res.status(200).send(entry);
      }, function (err) {
        console.log('err in route: ', err);
        res.status(500).send(err);
      });
    })
    // Updtate a specific entry
    .put(function (req, res) {
      mainControl.updateEntry(req.body, function (entry) {
        res.status(204).send(err);
      }, function (err) {
        console.log('err in route: ', err);
        res.status(500).send(err);
      });
    })
    // Delete a specific entry
    .delete(function (req, res) {
      mainControl.deleteEntry(req.body, function () {
          res.status(200).send(entry);
      }, function (err) {
        console.log('err in route: ', err);
        res.status(500).send(err);
      });
    });

};
