'use strict';

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = document.querySelector('.popup__photo');
    this._popupText = document.querySelector('.popup__photo-description');
  };

  open({ name, link }) {
    super.open();
    this._popupPicture.src = link;
    this._popupPicture.alt = name;
    this._popupText.textContent = name;
  };

}