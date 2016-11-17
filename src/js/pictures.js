'use strict';

(function() {

  var load = require('./load');
  var getPictureElement = require('./picture');
  var gallery = require('./gallery');

  var URL_PICTURES = 'http://localhost:1507/api/pictures';

  var container = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');

  filters.classList.add('hidden');

  var renderPhotos = function(photosArray) {
    photosArray.forEach(function(photo, index) {
      container.appendChild(getPictureElement(photo, index));
    });
    gallery.setPictures(photosArray);
  };

  load(URL_PICTURES, function(photos) {
    renderPhotos(photos);
  });

  filters.classList.remove('hidden');
})();
