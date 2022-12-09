'use strict';

import Popup from './Popup.js';
import PARAMS from '../utils/params.js';

export default class PopupWithConfirm extends Popup {
    constructor(handleSubmitDeleteCard, idCard, popupSelector) {
        super(popupSelector);
        this._idCard = idCard;
        this._popupForm = this._popup.querySelector(PARAMS.formSelector);
        this._handleSubmitDeleteCard = handleSubmitDeleteCard;
        //this._popupButton = this._popupForm.querySelector('.form__submit');
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            //console.log("До сюда работает")
            this._handleSubmitDeleteCard(evt, this._idCard);
        });
    };

}