'use strict';

import Popup from './Popup.js';
import PARAMS from '../utils/params.js';

export default class PopupWithConfirm extends Popup {
    constructor(handleSubmitDeleteCard, popupSelector) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector(PARAMS.formSelector);
        this._handleSubmitDeleteCard = handleSubmitDeleteCard;
        //this._popupButton = this._popupForm.querySelector('.form__submit');
        //this._idCard = idCard;
    }
/*
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            this._handleSubmitDeleteCard(evt);
        });
    };
    */
}