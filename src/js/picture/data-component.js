'use strict';

var DataComponent = function(data) {
  this.data = data;
  this.liked = false;
};

DataComponent.prototype.getLikes = function() {
  return this.data.likes;
};

DataComponent.prototype.getComments = function() {
  return this.data.comments;
};

DataComponent.prototype.getPhotoUrl = function() {
  return this.data.url;
};

DataComponent.prototype.getPhotoPreview = function() {
  return this.data.preview;
};

DataComponent.prototype.setLikesCount = function() {
  if (this.liked) {
    this.data.likes--;
  } else {
    this.data.likes++;
  }
  this.liked = !this.liked;

  var event = new Event('changeLikes');
  window.dispatchEvent(event);
};

DataComponent.prototype.isLiked = function() {
  return this.liked;
};

module.exports = DataComponent;
