'use strict';

const setEventListeners = (formElement, params) => {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, params);
      toggleButtonState(inputList, buttonElement, params);
    });
  });
};

const showInputError = (formElement, inputElement, errorMessage, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.classList.add(params.errorClass);
  errorElement.textContent = errorMessage;
};
  
const hideInputError = (formElement, inputElement, params) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(params.inputErrorClass);
    errorElement.classList.remove(params.errorClass);
    errorElement.textContent = '';
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

  function toggleButtonState(inputList, buttonElement, params) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(params.inactiveButtonClass);
      buttonElement.disabled = true
    } else {
      buttonElement.classList.remove(params.inactiveButtonClass);
      buttonElement.disabled = false
    };
  };


enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'error_visible'
}); 
