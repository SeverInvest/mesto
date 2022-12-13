'use strict';

import Popup from './Popup.js';
import PARAMS from '../utils/params.js';

export default class PopupWithConfirm extends Popup {
  constructor(handleSubmitDeleteCard, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(PARAMS.formSelector);
    this._handleSubmitDeleteCard = handleSubmitDeleteCard;
    // console.log(this);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      this._handleSubmitDeleteCard(evt, this._card);
    });
  };

  open(card) {
    super.open();
    this._card = card;
  };

}