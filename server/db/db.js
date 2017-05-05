var mlab = require('../config/env.js').mlab;
module.exports = {
  // INSERT YOUR DB URL PARAMETERS HERE

  // url to prod DB (Uncomment for production/go-live)
  // url: 'mongodb://' + mlab.dbuser + ':' + mlab.dbpassword + '@ds127801.mlab.com:27801/translation'

  // url to testing DB (Comment out when going live)
  url: 'mongodb://' + mlab.dbuser + ':' + mlab.dbpassword + '@ds127731.mlab.com:27731/translation-dev'
};