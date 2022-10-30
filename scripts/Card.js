'use strict';

import { renderPopupBigPhoto } from "./index.js";

const cardTemplate = document.querySelector('#card').content;
const cardsList = document.querySelector('.cards__list');

export default class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._cardsList = cardsList;
    this._cardElement = null;
  };

  _cardLikeToggle(evt) {
    evt.target.classList.toggle('card__heart_active');
  };

  _cardListeners() {
    this._cardElement.querySelector('.card__photo').addEventListener('click', renderPopupBigPhoto);
    this._cardElement.querySelector('.card__heart').addEventListener('click', this._cardLikeToggle);
    this._cardElement.querySelector('.card__remove-button').addEventListener('click', this._removeCard);
  }

  _createCard() {
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardElement.querySelector('.card__description').textContent = this._name;
    this._cardElement.querySelector('.card__photo').src = this._link;
    this._cardElement.querySelector('.card__photo').alt = this._name;
    this._cardListeners();
    return this._cardElement;
  }

  addCard() {
    this._cardsList.prepend(this._createCard());
  };

  _removeCard(evt) {
    evt.target.closest('.card').remove();
  };
};
