'use strict';

import "./index.css";

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from '../components/UserInfo.js';
import PARAMS from '../utils/params.js';
import initialCards from "../utils/cards.js";


// Cards
const cardsList = document.querySelector('.cards__list');

// Добавляем карточки из массива объектов на страницу
const cardList = new Section({
  items: initialCards,
  renderer: data => {
    cardList.addItem(createNewCard(data));
  }
},
  '.cards__list'
);
cardList.renderItems();

// Создаём экземпляр класса попапа на полный экран
const popupFullScreen = new PopupWithImage('.popup_type_photo');
popupFullScreen.setEventListeners();

// Объявляем функцию, которая записывает значения в элементы попапа 
function handleCardClick(data) { popupFullScreen.open(data) };

// функция создания новой карточки
function createNewCard(data) {
  return new Card(data, PARAMS.templateCardSelector, handleCardClick).createCard();
};
// функция добавляет карточку в массив 
function addCard(card) {
  cardsList.prepend(card);
}

// Создаём экземпляр класса попапа для добавления карточек
const popupAddCard = new PopupWithForm(handleSubmitCard, '.popup_type_card');

// Обработчик события submit формы добавления карточки 
function handleSubmitCard(evt, data) {
  evt.preventDefault();
  addCard(createNewCard(data));
  popupAddCard.close();
};

popupAddCard.setEventListeners();

function openPopupCard() {
  //cardForm.reset();
  formValidateCard.clearErrors();
  popupAddCard.open();
};

// Создание слушателя на кнопки открытия и сохранения попапа добавления карточки
const buttonOpenAddCard = document.querySelector('.traveler__button-add');
buttonOpenAddCard.addEventListener('click', openPopupCard);

// Создаём экземпляр класса попапа для редактирования профиля
const popupEditProfile = new PopupWithForm(handleSubmitProfile, '.popup_type_profile');

// Обработчик события submit формы редактированя профиля
function handleSubmitProfile(evt, data) {
  evt.preventDefault();
  userInfo.setUserInfo(data);
  popupEditProfile.close();
};

popupEditProfile.setEventListeners();

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.form');
export const inputListProfile = popupProfileForm.querySelectorAll('.form__input')
export const inputErrorListProfile = popupProfileForm.querySelectorAll('.error');
export const buttonSubmitProfile = popupProfileForm.querySelector('.form__submit');

const inputProfileName = popupProfileForm.querySelector('.form__input_type_name');
const inputProfileAbout = popupProfileForm.querySelector('.form__input_type_about');

function openPopupProfile() {
  const profileInfo = userInfo.getUserInfo();
  inputProfileName.value = profileInfo.profileName;
  inputProfileAbout.value = profileInfo.profileAbout;
  formValidateProfile.clearErrors();
  popupEditProfile.open();
};

const userInfo = new UserInfo('.traveler__name', '.traveler__about');

const profile = document.querySelector('.traveler')
const buttonOpenProfile = profile.querySelector('.traveler__button-correct');
buttonOpenProfile.addEventListener('click', openPopupProfile);

const cardPopup = document.querySelector('.popup_type_card');
const cardForm = cardPopup.querySelector('.form');
export const inputListCard = cardForm.querySelectorAll('.form__input');
export const cardErrorList = cardForm.querySelectorAll('.error');
export const buttonSubmitCard = cardForm.querySelector('.form__submit');

const formValidateProfile = new FormValidator(PARAMS, popupProfileForm);
const formValidateCard = new FormValidator(PARAMS, cardForm);
formValidateProfile.enableValidation();
formValidateCard.enableValidation();
