'use strict';

var gallery = require('./gallery');

var IMAGE_LOAD_TIMEOUT = 10000;

var template = document.getElementById('picture-template');
var templateContainer = 'content' in template ? template.content : template;


var getPictureElement = function(picture) {
  var pictureImageTimeout = null;
  var pictureElement = templateContainer.querySelector('.picture').cloneNode(true);

  pictureElement.querySelector('.picture-comments').textContent = picture.comments;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;

  var pictureImage = new Image();
  var image = pictureElement.querySelector('img');
  pictureImage.onload = function(evt) {
    clearTimeout(pictureImageTimeout);
    image.src = evt.target.src;
    image.width = '182';
    image.height = '182';
  };
  pictureImage.onerror = function() {
    pictureElement.classList.add('picture-load-failure');
  };

  pictureImage.src = picture.preview || picture.url;

  pictureImageTimeout = setTimeout(function() {
    pictureElement.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return pictureElement;
};

module.exports = function(data, index) {
  this.data = data;
  this.index = index;
  this.element = getPictureElement(this.data);

  var self = this;

  this.element.onclick = function(evt) {
    evt.preventDefault();
    gallery.show(self.index);
  };

  this.remove = function() {
    this.element.onclick = null;
  };
};









