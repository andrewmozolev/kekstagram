'use strict';

(function() {

  var load = require('./load');
  var Picture = require('./picture');
  var gallery = require('./gallery');
  var utils = require('./utils');

  var URL_PICTURES = 'http://localhost:1507/api/pictures';
  var PAGE_SIZE = 12;

  var currentPage = 0;

  var pageProperties = {
    from: currentPage * PAGE_SIZE,
    to: currentPage * PAGE_SIZE + PAGE_SIZE,
    filter: 'filter-popular'
  };

  var setPageProperties = function() {
    pageProperties.from = currentPage * PAGE_SIZE;
    pageProperties.to = currentPage * PAGE_SIZE + PAGE_SIZE;
  };

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

  var recurciveLoadPictures = function() {
    load(URL_PICTURES, pageProperties, function(photos) {
      renderPhotos(photos);
      if (utils.isBottomReached()) {
        currentPage++;
        setPageProperties();
        recurciveLoadPictures();
      }
    });
  };

  var sefFilterEnabled = function() {
    filters.addEventListener('change', function(evt) {
      if (evt.target.classList.contains('filters-radio')) {
        var filterName = evt.target.id;
        updatePhotos(filterName);
      }
    }, true);
  };


  var updatePhotos = function(filter) {
    container.innerHTML = '';
    currentPage = 0;
    pageProperties.filter = filter;
    setPageProperties();
    recurciveLoadPictures();
  };


  var lastDate = new Date();

  var setScrollEnable = function() {
    window.addEventListener('scroll', function() {
      if (new Date() - lastDate >= 100) {
        if (utils.isBottomReached()) {
          currentPage++;
          setPageProperties();
          load(URL_PICTURES, pageProperties, renderPhotos);
        }
        lastDate = new Date();
      }
    });
  };

  recurciveLoadPictures();
  setScrollEnable();
  sefFilterEnabled();

  filters.classList.remove('hidden');
})();
