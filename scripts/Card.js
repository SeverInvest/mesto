'use strict';

import { renderPopupBigPhoto } from "./index.js";

export default class Card {
  constructor(name, link, templateCardSelector) {
    this._name = name;
    this._link = link;
    this._templateCardSelector = templateCardSelector
    this._cardElement = this._getTemplate();
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateCardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  };

  _toggleLike() {
    this._cardElement.querySelector('.card__heart').classList.toggle('card__heart_active');
  };

  _removeCard() {
    this._cardElement.remove(); 
  };

  _setEventListeners() {
    this._cardElement.querySelector('.card__photo').addEventListener('click', renderPopupBigPhoto);
    this._cardElement.querySelector('.card__heart').addEventListener('click', () => this._toggleLike());
    this._cardElement.querySelector('.card__remove-button').addEventListener('click', () => this._removeCard());
  }

  createCard() {
    this._cardElement.querySelector('.card__description').textContent = this._name;
    this._cardElement.querySelector('.card__photo').src = this._link;
    this._cardElement.querySelector('.card__photo').alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
};
