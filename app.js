var express = require('express'),
  config = require('./config/config'),
  startup = require('./config/startupData');

var app = express();

require('./config/express')(app, config);

startup.loadData(function() {
  app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
  });
});
