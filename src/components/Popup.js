'use strict';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  };

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_visible');
  };

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_visible');
  };

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  };

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if ((evt.target.classList.contains('popup_visible')) || (evt.target.classList.contains('popup__close'))) {
        this.close();
      };
    });
  };

};