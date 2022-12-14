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
import Api from "../components/Api.js";
import connect from "../utils/connect.js";
import { renderLoading } from "../utils/utils.js";

const userInfo = new UserInfo(
  PARAMS.profaleNameSelector,
  PARAMS.profaleAboutSelector,
  PARAMS.profaleAvatarSelector);

const cardsList = document.querySelector(PARAMS.listCardsSelector);

const cardList = new Section({
  renderer: data => {
    cardList.addItem(createNewCard(data));
  }
},
  PARAMS.listCardsSelector
);

function isError(error) {
  console.log(error);
}

const api = new Api(connect);
api.getInitialData()
  .then((data) => {
    userInfo.renderUserInfo({
      name: data[0].name,
      about: data[0].about,
      myId: data[0]._id,
      avatar: data[0].avatar
    });
    cardList.renderItems({
      cards: data[1]
    })
  })
  .catch((error) => isError(error))

//Создаем экземпляр класса попапа изменения аватара
const popupUpdAvatar = new PopupWithForm(handleSubmitAvatar, PARAMS.popupUpdateAvatar);
popupUpdAvatar.setEventListeners();

function handleSubmitAvatar(evt, link, buttonSubmitText) {
  evt.preventDefault();
  renderLoading(avatarPopup, true, buttonSubmitText)
  api.setAvatar(link)
    .then(({ avatar }) => {
      userInfo.renderAvatar(avatar)
    })
    .catch((error) => isError(error))
    .finally(() => {
      popupUpdAvatar.close()
      renderLoading(avatarPopup, false, buttonSubmitText)
    })
}

// Создаём экземпляр класса попапа на полный экран
const popupFullScreen = new PopupWithImage(PARAMS.popupBigPhotoSelector);
popupFullScreen.setEventListeners();

function handleOpenPopupWithConfirm(card) {
  popupConfirmDeleteCard.open(card);
};

const popupConfirmDeleteCard = new PopupWithConfirm(
  handleSubmitDeleteCard,
  PARAMS.popupConfirmSelector
);

popupConfirmDeleteCard.setEventListeners();

function handleSubmitDeleteCard(evt, card) {
  evt.preventDefault();
  api.deleteCard(card._idCard)
    .then((response) => {
      if (response.message = "Пост удалён") {
        card.deleteCard();
      }
    })
    .catch((error) => {
      isError(error);
    })
    .finally(() => {
      popupConfirmDeleteCard.close()
    })
};

// Объявляем функцию, которая записывает значения в элементы попапа 
function handleCardClick(data) { popupFullScreen.open(data) };

// функция создания новой карточки
function createNewCard(data) {
  return new Card(
    data,
    PARAMS.templateCardSelector,
    handleCardClick,
    handleToggleLike,
    handleOpenPopupWithConfirm,
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
function handleSubmitCard(evt, data, buttonSubmitText) {
  evt.preventDefault();
  renderLoading(cardPopup, true, buttonSubmitText)
  api.setCard(data)
    .then((data) => {
      addCard(createNewCard(data));
    })
    .catch((error) => isError(error))
    .finally(() => {
      popupAddCard.close();
      renderLoading(cardPopup, false, buttonSubmitText);
    })
};

popupAddCard.setEventListeners();

function openPopupCard() {
  formValidateCard.clearErrors();
  popupAddCard.open();
};

// Создание слушателя на кнопки открытия и сохранения попапа добавления карточки
const buttonOpenAddCard = document.querySelector(PARAMS.buttonAddCardSelector);
buttonOpenAddCard.addEventListener('click', openPopupCard);

// Создаём экземпляр класса попапа для редактирования профиля
const popupEditProfile = new PopupWithForm(handleSubmitProfile, PARAMS.popupProfileSelector);

// Обработчик события submit формы редактированя профиля
function handleSubmitProfile(evt, data, buttonSubmitText) {
  evt.preventDefault();
  renderLoading(popupProfile, true, buttonSubmitText)
  api.setUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data)
    })
    // .then(() => popupEditProfile.close())
    .catch((error) => isError(error))
    .finally(() => {
      popupEditProfile.close();
      renderLoading(popupProfile, false, buttonSubmitText);
    })
};

function handleToggleLike(data) {
  api.toggleLikeCard(data)
    .then((response) => {
      data.card.setLikes(response.likes);
      data.card._setLike();
    })
    .catch((error) => { isError(error) })
};

popupEditProfile.setEventListeners();

const popupProfile = document.querySelector(PARAMS.popupProfileSelector);
const popupProfileForm = popupProfile.querySelector(PARAMS.formSelector);

const inputProfileName = popupProfileForm.querySelector(PARAMS.inputProfileName);
const inputProfileAbout = popupProfileForm.querySelector(PARAMS.inputProfileAbout);

function openPopupProfile() {
  const profileInfo = userInfo.getUserInfo();
  inputProfileName.value = profileInfo.profileName;
  inputProfileAbout.value = profileInfo.profileAbout;
  formValidateProfile.clearErrors();
  popupEditProfile.open();
};

function openPopupAddAvatar() {
  formValidateAvatar.clearErrors();
  popupUpdAvatar.open();
}

const profile = document.querySelector(PARAMS.profileSelector);
const buttonOpenProfile = profile.querySelector(PARAMS.profileButtonCorrectSelector);
buttonOpenProfile.addEventListener('click', openPopupProfile);
const buttonOpenUpdAvatar = profile.querySelector(PARAMS.profileButtonUpdAvatarSelector);
buttonOpenUpdAvatar.addEventListener('click', openPopupAddAvatar);

const cardPopup = document.querySelector(PARAMS.popupCardSelector);
const cardForm = cardPopup.querySelector(PARAMS.formSelector);
const avatarPopup = document.querySelector(PARAMS.popupUpdateAvatar);
const popupUpdAvatarForm = avatarPopup.querySelector(PARAMS.formSelector);

const formValidateProfile = new FormValidator(PARAMS, popupProfileForm);
const formValidateCard = new FormValidator(PARAMS, cardForm);
const formValidateAvatar = new FormValidator(PARAMS, popupUpdAvatarForm)
formValidateProfile.enableValidation();
formValidateCard.enableValidation();
formValidateAvatar.enableValidation();
