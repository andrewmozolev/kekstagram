'use strict';

var DataComponent = function(data) {
  this.data = data;
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

DataComponent.prototype.setLikesCount = function(like) {
  if (like) {
    this.data.likes++;
  } else {
    this.data.likes--;
  }
};

module.exports = DataComponent;
