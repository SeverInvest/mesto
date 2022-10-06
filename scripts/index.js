'use strict';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Объявление переменных
// Traveler (Profile)
const profile = document.querySelector('.traveler')
const buttonOpenProfile = profile.querySelector('.traveler__button-correct');
const nameOld = profile.querySelector('.traveler__name');
const aboutOld = profile.querySelector('.traveler__about');

// popupProfile
const popupProfile = document.querySelector('.popup_type_profile');
const profileForm = popupProfile.querySelector('.form');
const nameNew = profileForm.querySelector('.form__input_type_name');
const aboutNew = profileForm.querySelector('.form__input_type_about');

//общие
const buttonClose = document.querySelectorAll('.popup__close')

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
buttonClose.forEach((item) =>
  item.addEventListener('click', (event) =>
    popupClose(event.target.closest('.popup'))
  )
);

// Создание слушателей на кнопку открытия и сохранения popupProfile
buttonOpenProfile.addEventListener('click', popupOpenProfile);
profileForm.addEventListener('submit', popupSubmitProfile);

// Создание слушателя на кнопки открытия и сохранения попапа добавления карточки
buttonOpenAddCard.addEventListener('click', popupOpenCard);

// Добавляем карточки из массива объектов на страницу
initialCards.forEach((item) => addCard(createCard(item.name, item.link), cardsList));

// Декларирование функций
// Общие функции для всех popup
function popupOpen(popup) {
  popup.classList.add('popup_visible');
};

function popupClose(popup) {
  popup.classList.remove('popup_visible');
};

// Функции для popupProfile
function popupSubmitProfile(event) {
  event.preventDefault();
  nameOld.textContent = nameNew.value;
  aboutOld.textContent = aboutNew.value;
  popupClose(popupProfile);
};

function popupOpenProfile() {
  nameNew.value = nameOld.textContent;
  aboutNew.value = aboutOld.textContent;
  popupOpen(popupProfile);
  cardForm.addEventListener('submit', popupSubmitCard);
};

// Функции для попапа добавления карточки
function popupOpenCard() {
  cardHeader.value = '';
  cardLink.value = '';
  popupOpen(cardPopup);
  cardForm.addEventListener('submit', popupSubmitCard);
};

function popupSubmitCard(evt) {
  evt.preventDefault();
  console.log(document.querySelector('.form__input_type_place').value);
  addCard(createCard(cardHeader.value, cardLink.value), cardsList);
  cardHeader.value = '';
  cardLink.value = '';
  popupClose(cardPopup);
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
  cardImage.addEventListener('click', popupBigPhotoRender);

  cardElement.querySelector('.card__heart').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__heart_active')});

  cardElement
    .querySelector('.card__remove-button')
    .addEventListener('click', removeCard);

  return cardElement;
};

// Функции для popupBigPhoto
function popupBigPhotoRender(event) {
  popupOpen(popupBigPhoto);
  photoPopupHeader.textContent = event.target.closest('.card').querySelector('.card__description').textContent;
  bigPhoto.src = event.target.src;
  bigPhoto.alt = photoPopupHeader.textContent;
}
