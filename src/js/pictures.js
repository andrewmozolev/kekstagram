'use strict';

(function() {

  var urlPictures = 'http://localhost:1507/api/pictures';

  var load = function(url, callback) {

    window.JSONPCallback = function(data) {
      callback(data);
    };

    var script = document.createElement('script');
    script.src = url + '?callback=JSONPCallback';
    document.body.appendChild(script);
  };

  var IMAGE_LOAD_TIMEOUT = 10000;

  var container = document.querySelector('.pictures');
  var template = document.getElementById('picture-template');
  var templateContainer = 'content' in template ? template.content : template;
  var filters = document.querySelector('.filters');

  filters.classList.add('hidden');

  var getPhotoElement = function(photo) {
    var photoImageTimeout = null;
    var photoElement = templateContainer.querySelector('.picture').cloneNode(true);

    photoElement.querySelector('.picture-comments').textContent = photo.comments;
    photoElement.querySelector('.picture-likes').textContent = photo.likes;

    var photoImage = new Image();
    var image = photoElement.querySelector('img');
    photoImage.onload = function(evt) {
      clearTimeout(photoImageTimeout);
      image.src = evt.target.src;
      image.width = '182';
      image.height = '182';
    };
    photoImage.onerror = function() {
      photoElement.classList.add('picture-load-failure');
    };

    photoImage.src = photo.preview || photo.url;

    photoImageTimeout = setTimeout(function() {
      photoElement.classList.add('picture-load-failure');
    }, IMAGE_LOAD_TIMEOUT);

    return photoElement;
  };

  var renderPhotos = function(photosArray) {
    photosArray.forEach(function(photo) {
      container.appendChild(getPhotoElement(photo));
    });
  };

  load(urlPictures, function(photos) {
    renderPhotos(photos);
  });

  filters.classList.remove('hidden');
})();
