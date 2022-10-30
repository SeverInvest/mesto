'use strict';

import Card from "./Card.js";
import initialCards from "./cards.js";
import { FormValidatorCard, FormValidatorProfile } from "./FormValidator.js";
import PARAMS from "./params.js";

// Объявление переменных
// Traveler (Profile)
const profile = document.querySelector('.traveler')
const buttonOpenProfile = profile.querySelector('.traveler__button-correct');
const profileName = profile.querySelector('.traveler__name');
const profileAbout = profile.querySelector('.traveler__about');

// popupProfile
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.form');
export const inputListProfile = popupProfileForm.querySelectorAll('.form__input')
const inputName = popupProfileForm.querySelector('.form__input_type_name');
const inputAbout = popupProfileForm.querySelector('.form__input_type_about');
export const inputErrorListProfile = popupProfileForm.querySelectorAll('.error');
export const buttonSubmitProfile = popupProfileForm.querySelector('.form__submit');

//общие
const buttonsClose = document.querySelectorAll('.popup__close');
const popupList = document.querySelectorAll('.popup');

//cards
const buttonOpenAddCard = document.querySelector('.traveler__button-add');
const cardPopup = document.querySelector('.popup_type_card');
const cardForm = cardPopup.querySelector('.form');
export const inputListCard = cardForm.querySelectorAll('.form__input');
const cardHeader = cardForm.querySelector('.form__input_type_place');
const cardLink = cardForm.querySelector('.form__input_type_link');
export const cardErrorList = cardForm.querySelectorAll('.error');
export const buttonSubmitCard = cardForm.querySelector('.form__submit');

// popupBigPhoto
const popupBigPhoto = document.querySelector('.popup_type_photo');
const bigPhoto = popupBigPhoto.querySelector('.popup__photo');
const photoPopupHeader = popupBigPhoto.querySelector('.popup__photo-description');

//Создание слушателей на закрытие popup нажатием на оверлей, нажатием на кнопку Отмена
popupList.forEach((item) => setEventClosePopupOverlay(item));
buttonsClose.forEach((item) => setEventClosePopupButton(item));

// Создание слушателей на кнопку открытия и сохранения popupProfile
buttonOpenProfile.addEventListener('click', openPopupProfile);
popupProfileForm.addEventListener('submit', submitPopupProfile);

// Создание слушателя на кнопки открытия и сохранения попапа добавления карточки
buttonOpenAddCard.addEventListener('click', openPopupCard);
cardForm.addEventListener('submit', submitPopupCard);

// Добавляем карточки из массива объектов на страницу
initialCards.forEach((item) => {
  new Card(item.name, item.link).addCard();
});

// Декларирование функций
// Общие функции для всех popup

function setEventClosePopupOverlay(item) {
  item.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(item);
    };
  });
};

function setEventClosePopupButton(item) {
  item.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'))
  });
};

function setEventClosePopupForEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_visible'));
  }
}

function openPopup(popup) {
  document.addEventListener('keydown', setEventClosePopupForEscape);
  popup.classList.add('popup_visible');
};

function closePopup(popup) {
  document.removeEventListener('keydown', setEventClosePopupForEscape);
  popup.classList.remove('popup_visible');
};

// Функции для popupProfile
function submitPopupProfile(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupProfile);
};

function openPopupProfile() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  formValidateProfile.clearErrors();
  openPopup(popupProfile);
};

// Функции для попапа добавления карточки
function openPopupCard() {
  cardForm.reset();
  formValidateCard.clearErrors();
  openPopup(cardPopup);
};

function submitPopupCard(evt) {
  evt.preventDefault();
  new Card(cardHeader.value, cardLink.value).addCard();
  closePopup(cardPopup);
};

// Функции для popupBigPhoto
export function renderPopupBigPhoto(event) {
  openPopup(popupBigPhoto);
  photoPopupHeader.textContent = event.target.closest('.card').querySelector('.card__description').textContent;
  bigPhoto.src = event.target.src;
  bigPhoto.alt = photoPopupHeader.textContent;
}

const formValidateProfile = new FormValidatorProfile(PARAMS, popupProfileForm);
const formValidateCard = new FormValidatorCard(PARAMS, cardForm);
formValidateProfile.enableValidation();
formValidateCard.enableValidation();
