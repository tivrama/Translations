var mainControl = require('./mainController.js');
var then = require('mongoose').then;

module.exports = function (app) {

  app.route('/entry')
    // Get entry for the given customer
    .get(function (req, res) {
      mainControl.getEntry(req.query.customer).then(function (entry) {
        res.status(200).send(entry);
      }, function (err) {
        console.log('err in route: ', err);
        res.status(500).send(err);
      });
    })
    // Add entry to db
    .post(function (req, res) {
      console.log('inside post: ', req.body);
      // Add the entry to the database
      mainControl.addEntry(req.body).then(function (entry) {
        res.status(201).send(entry);
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
