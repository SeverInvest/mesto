'use strict';

import Popup from './Popup.js';
import PARAMS from '../utils/params.js';

export default class PopupWithForm extends Popup {
  constructor(handleSubmitClick, popupSelector) {
    super(popupSelector);
    this._handleSubmitClick = handleSubmitClick;
    this._inputs = {};
    this._inputList = Array.from(this._popup.querySelectorAll(PARAMS.inputSelector));
    this._form = this._popup.querySelector(PARAMS.formSelector);
    this._buttonSubmitCreate = "Создать";
  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      this._handleSubmitClick(
        evt,
        this._getInputValues(),
        this._buttonSubmitCreate
      );
    });
  };

  _getInputValues() {
    this._inputList
      .forEach((input) => {
        this._inputs[input.name] = input.value;
      });
    return this._inputs;
  };

  close() {
    super.close();
    this._form.reset();
  };

};