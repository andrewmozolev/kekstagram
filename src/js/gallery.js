'use strict';

var gallery = document.querySelector('.gallery-overlay');
var galleryClose = gallery.querySelector('.gallery-overlay-close');
var galleryImage = gallery.querySelector('.gallery-overlay-image');
var likes = gallery.querySelector('.likes-count');
var comments = gallery.querySelector('.comments-count');

var Gallery = function(pictures) {
  this.pictures = pictures;
  this.activePicture = 0;

  this.onElementClick = this.onElementClick.bind(this);
  this.onCloseClick = this.onCloseClick.bind(this);
  this.onLikeClick = this.onLikeClick.bind(this);
};

Gallery.prototype.setPictures = function(pictures) {
  this.pictures = pictures;
};

Gallery.prototype.show = function(index) {
  gallery.classList.remove('invisible');
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
  var currentPicture = this.pictures[index];
  this.activePicture = index;
  galleryImage.src = currentPicture.getPhotoPreview() || currentPicture.getPhotoUrl();
  likes.textContent = currentPicture.getLikes();
  comments.textContent = currentPicture.getComments();
};

Gallery.prototype.onCloseClick = function(evt) {
  if (evt.target === galleryClose) {
    this.hide();
  }
};

Gallery.prototype.onElementClick = function() {
  if (this.activePicture === this.pictures.length - 1) {
    this.activePicture = 0;
  } else {
    this.activePicture += 1;
  }
  this.setActivePicture(this.activePicture);
};

Gallery.prototype.onLikeClick = function() {
  var currentPicture = this.pictures[this.activePicture];
  var isLike = !currentPicture.like;
  currentPicture.setLikesCount(isLike);
  currentPicture.like = isLike;
  likes.textContent = currentPicture.getLikes();
  this.setLike(currentPicture);
};

Gallery.prototype.setLike = function(picture) {
  var isLike = picture.like;
  if (isLike) {
    likes.classList.add('likes-count-liked');
  } else {
    likes.classList.remove('likes-count-liked');
  }
};

module.exports = new Gallery();
