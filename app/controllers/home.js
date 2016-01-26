var express = require('express'),
  app = express(),
  router = express.Router(),
  startup = require('../../config/startupData');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  startup.db.findOne({ name: 'dataStore' }, function(err, result) {
    var currentDate = new Date();
    if(err) throw err;
    console.log('hit routes', 'dates: ' + (result.date - currentDate));
    if(result && result.date - currentDate < 86400000) {
      renderHome(res, result);
    } else {
      startup.loadData(function() {
        startup.db.findOne({ name: 'dataStore' }, function(err, result) {
          if(err) throw err;
          renderHome(res, result);
        });
      });
    }
  });
});

function renderHome(res, result) {
  res.render('index', {
    title: 'D3 Legendary & Set Item Drop Rates',
    items: result.items
  });
}
