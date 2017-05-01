var mongoose = require('mongoose');

// Entry Model
var EntrySchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  // Stringafied json -> the actual tranlations file
  jsonFile: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});


module.exports.Entry = mongoose.model('Entry', EntrySchema);
