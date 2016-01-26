(function(root, factory) {
  if(typeof define === 'function' && define.amd) {
    define([], function() {
        return (root.simplePubSub = factory())
    });
  } else if(typeof module === 'object' && module.exports) {
    module.exports = (root.simplePubSub = factory())
  } else {
    root.simplePubSub = root.SPS = factory()
  }
}((window || module || {}), function() {
  var _eventRegister = {};

  class SimplePubSub {
    on(e, ...callback) {
      if(callback.length && _eventRegister[e] && _eventRegister[e].length) {
        _eventRegister[e].push(...callback);
      } else if(callback.length){
        _eventRegister[e] = [];
        _eventRegister[e].push(...callback);
      } else {
        console.log('No callback passed for event ' + e);
      }
      return this;
    }
    trigger(e, ...args) {
      if(_eventRegister[e] && _eventRegister[e].length) {
        _eventRegister[e].forEach((x)=> { x(...args) });
      } else if (!_eventRegister[e]) {
        console.log('There is no event registered for ' + e);
      }
      return this;
    }
    off(e) {
      if(_eventRegister[e]) delete _eventRegister[e];
      return this;
    }
  };

  return new SimplePubSub();
}));
