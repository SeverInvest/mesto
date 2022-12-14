'use strict';

import Popup from './Popup.js';
import PARAMS from '../utils/params.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = this._popup.querySelector(PARAMS.popupPictureSelector);
    this._popupText = this._popup.querySelector(PARAMS.popupPictureTextSelector);
  };

  open({ name, link }) {
    super.open();
    this._popupPicture.src = link;
    this._popupPicture.alt = name;
    this._popupText.textContent = name;
  };

}