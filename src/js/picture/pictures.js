'use strict';

(function() {

  var load = require('./../load');
  var Picture = require('./picture');
  var gallery = require('./../gallery');
  var utils = require('./../utils');

  var URL_PICTURES = 'http://localhost:1507/api/pictures';
  var PAGE_SIZE = 12;
  var SCROLL_TIMEOUT_THROTTLE = 100;

  var currentPage = 0;
  var dataPhotos = [];
  var renderedPictures = [];

  var pageProperties = {
    from: currentPage * PAGE_SIZE,
    to: currentPage * PAGE_SIZE + PAGE_SIZE,
    filter: localStorage.filterName || 'filter-popular'
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
      var picture = new Picture(photo, container, index + pageProperties.from);
      picture.add();
      renderedPictures.push(picture);
    });

    dataPhotos = dataPhotos.concat(photosArray);
    gallery.setPictures(dataPhotos);
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
    filters.querySelector('#' + pageProperties.filter).checked = true;
    filters.addEventListener('change', function(evt) {
      if (evt.target.classList.contains('filters-radio')) {
        var filterName = evt.target.id;
        updatePhotos(filterName);
        localStorage.setItem('filterName', filterName);
      }
    }, true);
  };

  var updatePhotos = function(filter) {
    renderedPictures.forEach(function(item) {
      item.remove();
    });
    renderedPictures = [];
    dataPhotos = [];
    currentPage = 0;
    pageProperties.filter = filter;
    setPageProperties();
    recurciveLoadPictures();
  };

  var setScrollEnable = function() {
    window.addEventListener('scroll', utils.throttle(function() {
      if (utils.isBottomReached()) {
        currentPage++;
        setPageProperties();
        load(URL_PICTURES, pageProperties, renderPhotos);
      }
    }, SCROLL_TIMEOUT_THROTTLE));
  };

  recurciveLoadPictures();
  setScrollEnable();
  sefFilterEnabled();

  filters.classList.remove('hidden');
})();
