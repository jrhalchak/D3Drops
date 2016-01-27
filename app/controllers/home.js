var express = require('express'),
  app = express(),
  router = express.Router(),
  startup = require('../../config/startupData');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/about', function (req, res, next) {
  res.render('about', {
    title: 'About D3 Legendary & Set Item Drop Rates'
  });
});
