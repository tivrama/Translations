var path = require('path');

var morgan = require('morgan');
var bodyParser = require('body-parser');

var mainRoutes = require('../main/mainRoutes.js');

module.exports = function (app, express) {
  var mainRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.resolve(__dirname + '/../../client')));

  app.all('*', function (req, res, next) {
    if (!req.url.match(/\/api\/*/g)) {
      res.sendFile(path.resolve(__dirname + '/../../client/index.html'));
    } else {
      next();
    }
  });

  //inject routes into Router
  mainRoutes(mainRouter);

  // authentication middleware used to decode token and made available on the request
  app.use('/api/main', mainRouter);
};
