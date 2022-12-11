'use strict';

import "./index.css";

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import PopupUpdAvatar from '../components/PopupUpdAvatar.js';
import Section from '../components/Section.js';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from '../components/UserInfo.js';
import PARAMS from '../utils/params.js';
import Api from "../components/Api.js";
import connect from "../utils/connect.js";

const userInfo = new UserInfo(
  PARAMS.profaleNameSelector, 
  PARAMS.profaleAboutSelector, 
  PARAMS.profaleAvatarSelector);

const cardsList = document.querySelector(PARAMS.listCardsSelector);

let tempToggleButtonSubmit = ""

const cardList = new Section({
  renderer: data => {
    cardList.addItem(createNewCard(data));
  }
},
  PARAMS.listCardsSelector
);

const api = new Api(connect);
api.renderUserAndCards()
  .then((data) => {
    userInfo.renderUserInfo({
      name: data[0].name,
      about: data[0].about,
      myId: data[0]._id,
      avatar: data[0].avatar
    });
    cardList.renderItems({
      cards: data[1]
    });
  })

//Создаем экземпляр класса попапа изменения аватара
const popupUpdAvatar = new PopupUpdAvatar(handleSubmitClick, PARAMS.popupUpdateAvatar);
popupUpdAvatar.setEventListeners();

function handleSubmitClick(evt, link) {
  evt.preventDefault();
  toggleButtonSubmit(avatarPopup, true)
  return api.setAvatar({ "avatar": link })
    .then(({ avatar }) => {
      userInfo.renderAvatar(avatar)
    })
    .then(() => popupUpdAvatar.close())
    .finally(() => toggleButtonSubmit(avatarPopup, false))
}

// Создаём экземпляр класса попапа на полный экран
const popupFullScreen = new PopupWithImage(PARAMS.popupBigPhotoSelector);
popupFullScreen.setEventListeners();

function handleOpenPopupWithConfirm(objCard) {
  const handleSubmitDeleteCard = (evt, idCard) => {
    evt.preventDefault();
    return api.deleteCard(idCard)
      .then((response) => {
        popupConfirmDeleteCard.close();
        if (response.message = "Пост удалён") {
          objCard.deleteCard();
        }
        return response;
      })
      .catch(() => {
        popupConfirmDeleteCard.close();
      })
  }
  const popupConfirmDeleteCard = new PopupWithConfirm(
    handleSubmitDeleteCard,
    objCard._idCard,
    PARAMS.popupConfirmSelector
  );
  popupConfirmDeleteCard.setEventListeners();
  popupConfirmDeleteCard.open();
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
function handleSubmitCard(evt, data) {
  evt.preventDefault();
  toggleButtonSubmit(cardPopup, true)
  api.setCard(data)
    .then((data) => {
      addCard(createNewCard(data));
    })
    .then(() => popupAddCard.close())
    .finally(() => toggleButtonSubmit(cardPopup, false))
};

popupAddCard.setEventListeners();

function openPopupCard() {
  //cardForm.reset();
  formValidateCard.clearErrors();
  popupAddCard.open();
};

// Создание слушателя на кнопки открытия и сохранения попапа добавления карточки
const buttonOpenAddCard = document.querySelector(PARAMS.buttonAddCardSelector);
buttonOpenAddCard.addEventListener('click', openPopupCard);

// Создаём экземпляр класса попапа для редактирования профиля
const popupEditProfile = new PopupWithForm(handleSubmitProfile, PARAMS.popupProfileSelector);

// Обработчик события submit формы редактированя профиля
function handleSubmitProfile(evt, data) {
  evt.preventDefault();
  toggleButtonSubmit(popupProfile, true)
  api.setUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data)
    })
    .then(() => popupEditProfile.close())
    .finally(() => toggleButtonSubmit(popupProfile, false))
};

function handleToggleLike(data) {
  return api.toggleLikeCard(data)
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


function toggleButtonSubmit(popup, isProcess) {
  const buttonSubmitUpdAvatar = popup.querySelector(PARAMS.submitButtonSelector);
  if (isProcess) {
    tempToggleButtonSubmit = buttonSubmitUpdAvatar.textContent
    buttonSubmitUpdAvatar.textContent = "Сохранение...";
  } else {
    buttonSubmitUpdAvatar.textContent = tempToggleButtonSubmit;
    tempToggleButtonSubmit = "";
  }
}

const formValidateProfile = new FormValidator(PARAMS, popupProfileForm);
const formValidateCard = new FormValidator(PARAMS, cardForm);
const formValidateAvatar = new FormValidator(PARAMS, popupUpdAvatarForm)
formValidateProfile.enableValidation();
formValidateCard.enableValidation();
formValidateAvatar.enableValidation();
