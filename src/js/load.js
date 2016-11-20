'use strict';

var getSearchString = function(params) {
  return Object.keys(params).map(function(param) {
    return [param, params[param]].join('=');
  }).join('&');
};

module.exports = function(url, params, callback) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url + '?' + getSearchString(params));

  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.responseText);
    callback(loadedData);
  };

  xhr.send();
};
