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

//общие
const buttonsClose = document.querySelectorAll('.popup__close')

//cards
const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card').content;
const buttonOpenAddCard = document.querySelector('.traveler__button-add');
const cardPopup = document.querySelector('.popup_type_card');
const cardForm = cardPopup.querySelector('.form');
const cardHeader = cardForm.querySelector('.form__input_type_place');
const cardLink = cardForm.querySelector('.form__input_type_link');

// popupBigPhoto
const popupBigPhoto = document.querySelector('.popup_type_photo');
const bigPhoto = popupBigPhoto.querySelector('.popup__photo');
const photoPopupHeader = popupBigPhoto.querySelector('.popup__photo-description');

// Создание слушателей на кнопки закрытия попапов
buttonsClose.forEach((item) =>
  item.addEventListener('click', (event) =>
    closePopup(event.target.closest('.popup'))
  )
);

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
function popupOpen(popup) {
  popup.classList.add('popup_visible');
};

function closePopup(popup) {
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
  popupOpen(popupProfile);
};

// Функции для попапа добавления карточки
function openPopupCard() {
  cardForm.reset();
  popupOpen(cardPopup);
};

function submitPopupCard(evt) {
  evt.preventDefault();
  addCard(createCard(cardHeader.value, cardLink.value), cardsList);
  cardHeader.value = '';
  cardLink.value = '';
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
      evt.target.classList.toggle('card__heart_active')});

  cardElement
    .querySelector('.card__remove-button')
    .addEventListener('click', removeCard);

  return cardElement;
};

// Функции для popupBigPhoto
function renderPopupBigPhoto(event) {
  popupOpen(popupBigPhoto);
  photoPopupHeader.textContent = event.target.closest('.card').querySelector('.card__description').textContent;
  bigPhoto.src = event.target.src;
  bigPhoto.alt = photoPopupHeader.textContent;
}
