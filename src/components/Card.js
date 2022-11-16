'use strict';

export default class Card {
  constructor(data, templateCardSelector, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
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
    this._cardElement.querySelector('.card__photo').addEventListener('click', () => {
      this._handleCardClick({'name': this._name, 'link': this._link});
    });
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
