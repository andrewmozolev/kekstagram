'use strict';

var gallery = document.querySelector('.gallery-overlay');
var galleryClose = gallery.querySelector('.gallery-overlay-close');
var galleryImage = gallery.querySelector('.gallery-overlay-image');
var likes = gallery.querySelector('.likes-count');
var comments = gallery.querySelector('.comments-count');

var Gallery = function() {
  this.pictures = [];
  this.activeNumber = 0;
  this.activePicture = null;

  this.onElementClick = this.onElementClick.bind(this);
  this.onCloseClick = this.onCloseClick.bind(this);
  this.onLikeClick = this.onLikeClick.bind(this);
};

Gallery.prototype.setPictures = function(pictures) {
  this.pictures = pictures;
};

Gallery.prototype.show = function(index) {
  gallery.classList.remove('invisible');
  this.activePicture = this.pictures[index];
  this.setActivePicture(index);
  this.setLike(this.pictures[index]);

  // add events
  galleryImage.addEventListener('click', this.onElementClick);
  galleryClose.addEventListener('click', this.onCloseClick);
  likes.addEventListener('click', this.onLikeClick);
};

Gallery.prototype.hide = function() {
  gallery.classList.add('invisible');
  // remove events
  galleryImage.removeEventListener('click', this.onElementClick);
  galleryClose.removeEventListener('click', this.onCloseClick);
  likes.removeEventListener('click', this.onLikeClick);
  likes.classList.remove('likes-count-liked');
};

Gallery.prototype.setActivePicture = function(index) {
  this.activeNumber = index;
  galleryImage.src = this.activePicture.getPhotoPreview() || this.activePicture.getPhotoUrl();
  likes.textContent = this.activePicture.getLikes();
  comments.textContent = this.activePicture.getComments();
};

Gallery.prototype.onCloseClick = function(evt) {
  if (evt.target === galleryClose) {
    this.hide();
  }
};

Gallery.prototype.onElementClick = function() {
  if (this.activeNumber === this.pictures.length - 1) {
    this.activeNumber = 0;
  } else {
    this.activeNumber += 1;
  }
  this.setActivePicture(this.activeNumber);
  this.setLike(this.activePicture);
};

Gallery.prototype.onLikeClick = function() {
  this.activePicture.setLikesCount();
  likes.textContent = this.activePicture.getLikes();
  this.setLike(this.activePicture);
};

Gallery.prototype.setLike = function(picture) {
  if (picture.isLiked()) {
    likes.classList.add('likes-count-liked');
  } else {
    likes.classList.remove('likes-count-liked');
  }
};

module.exports = new Gallery();
