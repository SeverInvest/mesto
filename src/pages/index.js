'use strict';

import "./index.css";

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Section from '../components/Section.js';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from '../components/UserInfo.js';
import PARAMS from '../utils/params.js';
//import initialCards from "../utils/cards.js";
import Api from "../components/Api.js";
import connect from "../utils/connect.js";

const userInfo = new UserInfo('.traveler__name', '.traveler__about');
const cardsList = document.querySelector('.cards__list');

const cardList = new Section({
  renderer: data => {
    cardList.addItem(createNewCard(data));
  }
},
  '.cards__list'
);

const api = new Api(connect);
api.renderUserAndCards()
  .then((data) => {
    userInfo.setUserInfo({
      name: data[0].name,
      about: data[0].about,
      myId: data[0]._id
    });
    cardList.renderItems({
      cards: data[1]
    });
  })

// Создаём экземпляр класса попапа на полный экран
const popupFullScreen = new PopupWithImage(PARAMS.popupBigPhotoSelector);
popupFullScreen.setEventListeners();

const popupConfirmDeleteCard = new PopupWithConfirm(handleSubmitDeleteCard, PARAMS.popupConfirmSelector);
popupConfirmDeleteCard.setEventListeners();

function handleSubmitDeleteCard(evt, idCard) {
  evt.preventDefault();
  api.deleteCard(idCard)
  .then(() => {

  })
  .then(() => popupConfirmDeleteCard.close());
}




// Объявляем функцию, которая записывает значения в элементы попапа 
function handleCardClick(data) { popupFullScreen.open(data) };

// функция создания новой карточки
function createNewCard(data) {
  return new Card(
    data,
    PARAMS.templateCardSelector,
    handleCardClick,
    handleToggleLike,
    userInfo.getUserInfo().myId
  )
    .createCard();
};
// функция добавляет карточку в массив 
function addCard(card) {
  cardsList.prepend(card);
}

// Создаём экземпляр класса попапа для добавления карточек
const popupAddCard = new PopupWithForm(handleSubmitCard, PARAMS.popupCardSelector);

// Обработчик события submit формы добавления карточки 
function handleSubmitCard(evt, data) {
  evt.preventDefault();
  api.setCard(data)
    .then((data) => {
      addCard(createNewCard(data));
    })
    .then(() => popupAddCard.close());
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
  api.setUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data)
    })
    .then(() => popupEditProfile.close())
};

function handleToggleLike(data) {
  return api.toggleLikeCard(data)
};


popupEditProfile.setEventListeners();

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.form');

const inputProfileName = popupProfileForm.querySelector('.form__input_type_name');
const inputProfileAbout = popupProfileForm.querySelector('.form__input_type_about');

function openPopupProfile() {
  const profileInfo = userInfo.getUserInfo();
  inputProfileName.value = profileInfo.profileName;
  inputProfileAbout.value = profileInfo.profileAbout;
  formValidateProfile.clearErrors();
  popupEditProfile.open();
};

const profile = document.querySelector('.traveler')
const buttonOpenProfile = profile.querySelector('.traveler__button-correct');
buttonOpenProfile.addEventListener('click', openPopupProfile);

const cardPopup = document.querySelector('.popup_type_card');
const cardForm = cardPopup.querySelector('.form');

const formValidateProfile = new FormValidator(PARAMS, popupProfileForm);
const formValidateCard = new FormValidator(PARAMS, cardForm);
formValidateProfile.enableValidation();
formValidateCard.enableValidation();
