'use strict';

var IMAGE_LOAD_TIMEOUT = 10000;

var template = document.getElementById('picture-template');
var templateContainer = 'content' in template ? template.content : template;
var templatePicture = templateContainer.querySelector('.picture');

var getPictureElement = function(picture) {
  var pictureImageTimeout = null;
  var pictureElement = templatePicture.cloneNode(true);

  pictureElement.querySelector('.picture-comments').textContent = picture.comments;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;

  var pictureImage = new Image();
  var image = pictureElement.querySelector('img');

  pictureImage.addEventListener('load', function(evt) {
    clearTimeout(pictureImageTimeout);
    image.src = evt.target.src;
    image.width = '182';
    image.height = '182';
  });

  pictureImage.addEventListener('error', function() {
    pictureElement.classList.add('picture-load-failure');
  });

  pictureImage.src = picture.preview || picture.url;

  pictureImageTimeout = setTimeout(function() {
    pictureElement.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return pictureElement;
};

module.exports = getPictureElement;
