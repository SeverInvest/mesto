'use strict';

const setEventListeners = (formElement, params) => {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, params);
      toggleButtonState(buttonElement, params, hasInvalidInput(inputList))
    });
  });
};

const showInputError = (formElement, inputElement, errorMessage, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  addClassError(inputElement, params);
  addValidationErrors(errorElement, params, errorMessage);
};

const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  removeClassError(inputElement, params);
  removeValidationErrors(errorElement, params);
};


const checkInputValidity = (formElement, inputElement, params) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, params);
  });
};

function addValidationErrors(errorElement, params, errorMessage) {
  errorElement.classList.add(params.errorClass);
  errorElement.textContent = errorMessage;
}

function removeValidationErrors(errorElement, params) {
  errorElement.textContent = ''
  errorElement.classList.remove(params.errorClass);
};

function addClassError(inputElement, params) {
  inputElement.classList.remove(params.inputErrorClass);
};

function removeClassError(inputElement, params) {
  inputElement.classList.remove(params.inputErrorClass);
};

function toggleButtonState(button, params, inOrOff) {
  button.disabled = inOrOff;
  if (inOrOff) {
    button.classList.add(params.inactiveButtonClass);
  } else {
    button.classList.remove(params.inactiveButtonClass);
  }
};

const params = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'error_visible'
}

enableValidation(params); 
