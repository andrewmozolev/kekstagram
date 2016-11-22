'use strict';

var gallery = require('./../gallery');
var getPictureElement = require('./get-picture-element');
var BaseComponent = require('./../base-component');
var utils = require('./../utils');

var Picture = function(data, container, index) {
  this.data = data;
  this.container = container;
  this.index = index;
  this.element = getPictureElement(this.data);

  BaseComponent.call(this, this.element, this.container);

  this.showPicture = this.showPicture.bind(this);
  this.addEvent(this.element, 'click', this.showPicture);
};

utils.inherit(Picture, BaseComponent);

Picture.prototype.showPicture = function(evt) {
  evt.preventDefault();
  gallery.show(this.index);
};

module.exports = Picture;






