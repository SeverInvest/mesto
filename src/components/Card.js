'use strict';

export default class Card {
  constructor(data, templateCardSelector, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateCardSelector = templateCardSelector
    this._cardElement = this._getTemplate();
    this._photo = this._cardElement.querySelector('.card__photo');
    this._heart = this._cardElement.querySelector('.card__heart');
    this._description = this._cardElement.querySelector('.card__description');
    this._remove_button = this._cardElement.querySelector('.card__remove-button');
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
    this._heart.classList.toggle('card__heart_active');
  };

  _removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _setEventListeners() {
    this._photo.addEventListener('click', () => {
      this._handleCardClick({'name': this._name, 'link': this._link});
    });
    this._heart.addEventListener('click', () => this._toggleLike());
    this._remove_button.addEventListener('click', () => this._removeCard());
  }

  createCard() {
    this._description.textContent = this._name;
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
};
