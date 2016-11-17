'use strict';

var gallery = document.querySelector('.gallery-overlay');
var galleryClose = gallery.querySelector('.gallery-overlay-close');
var galleryImage = gallery.querySelector('.gallery-overlay-image');
var likes = gallery.querySelector('.likes-count');
var comments = gallery.querySelector('.comments-count');

var Gallery = function(pictures) {
  this.pictures = pictures;
  this.activePicture = 0;
};

Gallery.prototype.setPictures = function(pictures) {
  this.pictures = pictures;
};

Gallery.prototype.show = function(val) {
  gallery.classList.remove('invisible');
  this.setActivePicture(val);
  // add events
  var self = this;

  galleryImage.onclick = function() {
    self.onElementClick();
  };

  galleryClose.onclick = function(evt) {
    if (evt.target === galleryClose) {
      self.hide();
    }
  };
};

Gallery.prototype.hide = function() {
  gallery.classList.add('invisible');
  // remove events
  galleryImage.onclick = null;
  galleryClose.onclick = null;
};

Gallery.prototype.setActivePicture = function(val) {
  var pic = this.pictures[val];
  this.activePicture = val;
  galleryImage.src = pic.preview || pic.url;
  likes.textContent = pic.likes;
  comments.textContent = pic.comments;
};

Gallery.prototype.onCloseClick = function() {
  this.hide();
};

Gallery.prototype.onElementClick = function() {
  if (this.activePicture === this.pictures.length - 1) {
    this.activePicture = 0;
  } else {
    this.activePicture += 1;
  }
  this.setActivePicture(this.activePicture);
};

module.exports = new Gallery();
