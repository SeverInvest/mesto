'use strict';

export default class FormValidator {
  constructor(params, formElement) {
    this._params = params;
    this._formElement = formElement;
    this._errorList = formElement.querySelectorAll(params.spanErrorSelector);
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

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    this._buttonElement.disabled = this._hasInvalidInput();
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._params.inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._params.inactiveButtonClass);
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._params.submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState()
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  clearErrors() {
    this._inputList.forEach((inputElement) => {
      this._removeClassError(inputElement);
    });
    this._toggleButtonState()
    this._errorList.forEach((errorElement) => this._removeValidationErrors(errorElement));
  };
};
