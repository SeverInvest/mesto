'use strict';

export default class Section {
  constructor({ renderer }, containerSelector) {
    //this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  addItem(element) {
    this._container.append(element);
  };

  renderItems(objects) {
    console.log(objects);
    objects.cards.forEach(item => {
      this._renderer(item);
    });
  };
};