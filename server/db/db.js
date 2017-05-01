var mlab = require('../config/env.js').mlab;
console.log('mongodb://' + mlab.dbuser + ':' + mlab.dbpassword + '@ds127731.mlab.com:27731/translation-dev')
module.exports = {
  // INSERT YOUR DB URL PARAMETERS HERE
  // url: 'mongodb://' + mlab.dbuser + ':' + mlab.dbpassword + '[yoururl.mlab.com:17195/yourapp]'
  // url to testing DB.
  url: 'mongodb://' + mlab.dbuser + ':' + mlab.dbpassword + '@ds127731.mlab.com:27731/translation-dev'
};
