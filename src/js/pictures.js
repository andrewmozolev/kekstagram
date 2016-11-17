'use strict';

(function() {

  var load = require('./load');
  var Picture = require('./picture');
  var gallery = require('./gallery');

  var URL_PICTURES = 'http://localhost:1507/api/pictures';

  var container = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');

  filters.classList.add('hidden');

  var renderPhotos = function(photosArray) {
    photosArray.forEach(function(photo, index) {
      var picture = new Picture(photo, index);
      container.appendChild(picture.element);
    });
    gallery.setPictures(photosArray);
  };

  load(URL_PICTURES, function(photos) {
    renderPhotos(photos);
  });

  filters.classList.remove('hidden');
})();
