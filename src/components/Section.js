'use strict';

export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  addItem(element) {
    this._container.append(element);
  };

  renderItems(items) {
    items.cards.forEach(item => {
      this._renderer(item);
    });
  };
};