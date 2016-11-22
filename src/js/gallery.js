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
  this.hashChange = this.hashChange.bind(this);
  window.addEventListener('hashchange', this.hashChange);
};

Gallery.prototype.setPictures = function(pictures) {
  this.pictures = pictures;
  this.hashChange();
};

Gallery.prototype.show = function(url) {
  gallery.classList.remove('invisible');
  this.setActivePicture(url);

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
  history.pushState('', '', window.location.pathname);
};

Gallery.prototype.setActivePicture = function(url) {
  this.pictures.forEach(function(item, index) {
    if (item.getPhotoUrl() === url) {
      this.activeNumber = index;
      this.activePicture = this.pictures[this.activeNumber];
      this.setLike(this.activePicture);

      galleryImage.src = this.activePicture.getPhotoPreview() || this.activePicture.getPhotoUrl();
      likes.textContent = this.activePicture.getLikes();
      comments.textContent = this.activePicture.getComments();
    }
  }.bind(this));
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
  this.updateHash(this.activeNumber);
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

Gallery.prototype.updateHash = function(index) {
  location.hash = 'photo/' + this.pictures[index].data.url;
};

Gallery.prototype.hashChange = function() {
  var hash = location.hash.match(/#photo\/(\S+)/);
  if (hash) {
    this.show(hash[1]);
  } else {
    this.hide();
  }
};

module.exports = new Gallery();
