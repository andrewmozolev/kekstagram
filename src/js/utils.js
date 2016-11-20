'use strict';

module.exports = {
  isBottomReached: function() {
    var GAP = 100;
    var footerElement = document.querySelector('footer');
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
