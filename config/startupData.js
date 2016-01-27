var express = require('express'),
  tabletop = require('tabletop'),
  rp = require('request-promise'),
  extend = require('extend'),
  Promise = require('bluebird'),
  throttle = require('promise-ratelimit')(100),
  Datastore = require('nedb'),

  db = new Datastore({ filename: './data/items.db', autoload: true }),
  app = express();

var _sheetsKey = process.env.SHEETS_KEY,
  _apiBaseUrl = 'https://us.api.battle.net/d3/data/item/',
  _apiKey = process.env.BLIZZ_API_KEY;

module.exports = {
  loadData: function(callback) {
    console.log('in loaditems');
    _getItems(callback);
  },
  db: db
}

function _getItemData(itemUrl) {
  var itemUrlName = itemUrl.substr(itemUrl.lastIndexOf('/') + 1),
    options = {
      uri: _apiBaseUrl + itemUrlName,
      qs: {
          locale: 'en_US',
          apikey: _apiKey
      },
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
    };

  console.log(itemUrlName);

  return throttle().then(()=>rp(options).promise());
}

function _getBlizzData(data, callback) {
  var requests = [], itemObjects = [];
  console.log('starting Blizzard API');

  data.filter((x)=> !!x.itemName && !!x.bNetLink).forEach((i)=> {
      requests.push(
        _getItemData(i.bNetLink).then((apiData)=>{
          itemObjects.push(extend(i, apiData));
        }).catch((err)=> {
          console.log('Error hitting blizzard API for ' + i.itemName, err);
        })
      );
  });

  Promise.all(requests).then(function() {
    var nonLinkedObjects = data.filter((x)=> !!x.itemName && !x.bNetLink),
      completeCollection = nonLinkedObjects.length ? itemObjects.concat(nonLinkedObjects) : itemObjects;

    console.log(
      'All requests finished',
      'Linked objects ' + itemObjects.length,
      'Non-linked objects ' + nonLinkedObjects.length,
      'Complete objects ' + completeCollection.length
    );

    db.update({
      name: 'dataStore'
    },
    {
      items: completeCollection,
      name: 'dataStore',
      date: new Date()
    },
    { upsert: true },
    function(err, result) {
      callback();
    });
  });
}

function _getItems(callback) {
  console.log('in getitems');
  callback();
  /* temporary since sheets API is down
  db.findOne({ name: 'dataStore' }, function(err, result) {
    var currentDate = new Date();
    if(result && (currentDate - result.date < 86400000)) {
      console.log('skipping API calls and invoking callback');
      callback();
    } else {
      console.log('hitting the sheets API');

      tabletop.init({
        key: _sheetsKey,
        simpleSheet: false,
        callback: function(data) {
          console.log('in tabletop callback');
          var spreadSheetData = data.RawData.elements;
          _getBlizzData(spreadSheetData, callback);
        }
      });
    }
  })*/
}
