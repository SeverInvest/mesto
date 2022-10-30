'use strict';

import {
  inputListProfile, inputErrorListProfile, buttonSubmitProfile,
  inputListCard, cardErrorList, buttonSubmitCard
} from "./index.js";

export class FormValidator {
  constructor(params, formElement) {
    this._params = params;
    this._formElement = formElement;
  };

  _addClassError(inputElement) {
    inputElement.classList.remove(this._params.inputErrorClass);
  };

  _removeClassError(inputElement) {
    inputElement.classList.remove(this._params.inputErrorClass);
  };

  _addValidationErrors(errorElement, errorMessage) {
    errorElement.classList.add(this._params.errorClass);
    errorElement.textContent = errorMessage;
  };

  _removeValidationErrors(errorElement) {
    errorElement.textContent = ''
    errorElement.classList.remove(this._params.errorClass);
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._addClassError(inputElement);
    this._addValidationErrors(errorElement, errorMessage);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._removeClassError(inputElement);
    this._removeValidationErrors(errorElement);
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(button, inOrOff) {
    button.disabled = inOrOff;
    if (inOrOff) {
      button.classList.add(this._params.inactiveButtonClass);
    } else {
      button.classList.remove(this._params.inactiveButtonClass);
    }
  };

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));
    const buttonElement = this._formElement.querySelector(this._params.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(buttonElement, this._hasInvalidInput(inputList))
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  clearErrorsFields(_inputList, _buttonSubmit, _isInactiveButton, _errorList) {
    this._inputList.forEach((inputElement) => {
      this._removeClassError(inputElement);
    });
    this._toggleButtonState(this._buttonSubmit, _isInactiveButton)
    this._errorList.forEach((errorElement) => this._removeValidationErrors(errorElement));
  };
};

export class FormValidatorProfile extends FormValidator {
  constructor(params, formElement) {
    super(params, formElement);
    this._inputList = inputListProfile;
    this._errorList = inputErrorListProfile;
    this._buttonSubmit = buttonSubmitProfile;

  };

  clearErrors() {
    super.clearErrorsFields(this._inputList, this._buttonSubmit, false, this._errorList);
  };
};

export class FormValidatorCard extends FormValidator {
  constructor(params, formElement) {
    super(params, formElement);
    this._inputList = inputListCard;
    this._errorList = cardErrorList;
    this._buttonSubmit = buttonSubmitCard;

  };

  clearErrors() {
    super.clearErrorsFields(this._inputList, this._buttonSubmit, true, this._errorList);
  };
};