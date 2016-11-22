'use strict';

var BaseComponent = function(element, container) {
  this.element = element;
  this.container = container;
};

/**
 * Добавление DOM элемента.
 */
BaseComponent.prototype.add = function() {
  this.container.appendChild(this.element);
};

/**
 * Удаление DOM элемента.
 */
BaseComponent.prototype.remove = function() {
  this.removeEvents();
  this.element.parentNode.removeChild(this.element);
};

/**
 * Добавление обработчика события для указанного элемента и сохранение его в массив.
 * @param  {HTMLElement}   element  Элемент на который нужно добавить событие.
 * @param  {String}        event    Событие которое нужно добавить.
 * @param  {Function}      callback
 */
BaseComponent.prototype.addEvent = function(element, event, callback) {
  element.addEventListener(event, callback);
  if (!this.events) {
    this.events = [];
  }
  this.events.push({
    element: element,
    event: event,
    callback: callback
  });
};

/**
 * Удаление всех событий.
 */
BaseComponent.prototype.removeEvents = function() {
  this.events.forEach(function(item) {
    item.element.removeEventListener(item.event, item.callback);
  });
};

module.exports = BaseComponent;
