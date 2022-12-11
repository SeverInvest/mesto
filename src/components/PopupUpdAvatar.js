import Popup from './Popup.js';
import PARAMS from '../utils/params.js';

export default class PopupUpdAvatar extends Popup {
  constructor(handleSubmitClick, popupSelector) {
    super(popupSelector);
    this._handleSubmitClick = handleSubmitClick;
    this._input = this._popup.querySelector(PARAMS.inputSelector);
    this._form = this._popup.querySelector(PARAMS.formSelector);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      this._handleSubmitClick(evt, this._getInputValue());
    });
  };

  _getInputValue() {
    return this._input.value;
  };

  close() {
    super.close();
    this._form.reset();
  };

};