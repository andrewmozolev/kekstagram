'use strict';

module.exports = function(url, callback) {
  window.JSONPCallback = function(data) {
    callback(data);
  };

  var script = document.createElement('script');
  script.src = url + '?callback=JSONPCallback';
  document.body.appendChild(script);
};
