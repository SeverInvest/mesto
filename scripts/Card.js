'use strict';

import { renderPopupBigPhoto } from "./index.js";

export default class Card {
  constructor(name, link, templateCardSelector) {
    this._name = name;
    this._link = link;
    this._cardTemplate = this._getTemplate(templateCardSelector);
  };

  _getTemplate(templateCardSelector) {
    return document.querySelector(templateCardSelector).content;
  };

  _toggleLike(evt) {
    evt.target.classList.toggle('card__heart_active');
  };

  _removeCard(evt) {
    // этот код не работает
    // TypeError: undefined is not an object (evaluating 'this._cardElement.remove')
    //this._cardElement.remove(); 
    evt.target.closest('.card').remove();
  };

  _setEventListeners() {
    this._cardElement.querySelector('.card__photo').addEventListener('click', renderPopupBigPhoto);
    this._cardElement.querySelector('.card__heart').addEventListener('click', this._toggleLike);
    this._cardElement.querySelector('.card__remove-button').addEventListener('click', this._removeCard);
  }

  createCard() {
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardElement.querySelector('.card__description').textContent = this._name;
    this._cardElement.querySelector('.card__photo').src = this._link;
    this._cardElement.querySelector('.card__photo').alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
};
