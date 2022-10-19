'use strict';

// Объявление переменных
// Traveler (Profile)
const profile = document.querySelector('.traveler')
const buttonOpenProfile = profile.querySelector('.traveler__button-correct');
const profileName = profile.querySelector('.traveler__name');
const profileAbout = profile.querySelector('.traveler__about');

// popupProfile
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.form');
const inputName = popupProfileForm.querySelector('.form__input_type_name');
const inputAbout = popupProfileForm.querySelector('.form__input_type_about');
const inputErrorListProfile = popupProfileForm.querySelectorAll('.error');
const buttonSubmitProfile = popupProfileForm.querySelector('.form__submit');

//общие
const buttonsClose = document.querySelectorAll('.popup__close');
const popupList = document.querySelectorAll('.popup');

//cards
const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card').content;
const buttonOpenAddCard = document.querySelector('.traveler__button-add');
const cardPopup = document.querySelector('.popup_type_card');
const cardForm = cardPopup.querySelector('.form');
const cardHeader = cardForm.querySelector('.form__input_type_place');
const cardLink = cardForm.querySelector('.form__input_type_link');
const cardErrorList = cardForm.querySelectorAll('.error');
const buttonSubmitCard = cardForm.querySelector('.form__submit');

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
initialCards.forEach((item) => addCard(createCard(item.name, item.link), cardsList));

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
  removeClassError(inputName, params);
  removeClassError(inputAbout, params);
  toggleButtonState(buttonSubmitProfile, params, false);
  inputErrorListProfile.forEach((errorElement) => removeValidationErrors(errorElement, params));
  openPopup(popupProfile);
};

// Функции для попапа добавления карточки
function openPopupCard() {
  cardForm.reset();
  removeClassError(cardHeader, params);
  removeClassError(cardLink, params);
  toggleButtonState(buttonSubmitCard, params, true)
  cardErrorList.forEach((errorElement) => removeValidationErrors(errorElement, params));
  openPopup(cardPopup);
};

function submitPopupCard(evt) {
  evt.preventDefault();
  addCard(createCard(cardHeader.value, cardLink.value), cardsList);
  closePopup(cardPopup);
};

// Функции для карточек
function addCard(card, container) {
  container.prepend(card);
};

function removeCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
};

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__description').textContent = name;
  const cardImage = cardElement.querySelector('.card__photo');
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener('click', renderPopupBigPhoto);

  cardElement.querySelector('.card__heart').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__heart_active')
  });

  cardElement
    .querySelector('.card__remove-button')
    .addEventListener('click', removeCard);

  return cardElement;
};

// Функции для popupBigPhoto
function renderPopupBigPhoto(event) {
  openPopup(popupBigPhoto);
  photoPopupHeader.textContent = event.target.closest('.card').querySelector('.card__description').textContent;
  bigPhoto.src = event.target.src;
  bigPhoto.alt = photoPopupHeader.textContent;
}
