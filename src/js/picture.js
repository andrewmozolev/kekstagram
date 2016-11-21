'use strict';

var gallery = require('./gallery');
var getPictureElement = require('./get-picture-element');

var Picture = function(data, index) {
  this.data = data;
  this.index = index;
  this.element = getPictureElement(this.data);

  this.showPicture = this.showPicture.bind(this);
  this.element.addEventListener('click', this.showPicture);
};

Picture.prototype.showPicture = function(evt) {
  evt.preventDefault();
  gallery.show(this.index);
};

Picture.prototype.remove = function() {
  this.element.removeEventListener('click', this.showPicture);
};

module.exports = Picture;






