'use strict';

var footerElement = document.querySelector('footer');

module.exports = {
  inherit: function(ChildComponent, BaseComponent) {
    var EmptyConstructor = function() {};
    EmptyConstructor.prototype = BaseComponent.prototype;
    ChildComponent.prototype = new EmptyConstructor();
  },

  isBottomReached: function() {
    var GAP = 100;
    var footerPosition = footerElement.getBoundingClientRect();
    return footerPosition.top - window.innerHeight - GAP <= 0;
  },

  throttle: function(callback, time) {
    var lastDate = Date.now();

    return function() {
      if (Date.now() - lastDate >= time) {
        callback();
        lastDate = Date.now();
      }
    };
  }
};
