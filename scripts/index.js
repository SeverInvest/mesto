const profile = document.querySelector('.traveler')
const buttonOpen = profile.querySelector('.traveler__button-correct');
let nameOld = profile.querySelector('.traveler__name');
let aboutOld = profile.querySelector('.traveler__about');

const popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.popup__close');

const form = popup.querySelector('.form');
const buttonSubmit = form.querySelector('.form__submit');
let nameNew = form.querySelector('.form__input_type_name');
let aboutNew = form.querySelector('.form__input_type_about');

function popupSubmit(event) {
  event.preventDefault();
  nameOld.textContent = nameNew.value;
  aboutOld.textContent = aboutNew.value;
  popupClose(event);
}

function popupOpen() {
  nameNew.value = nameOld.textContent;
  aboutNew.value = aboutOld.textContent;
  popup.classList.add('popup_visible');
}

function popupClose(event) {
  if (event.target == event.currentTarget) {
    popup.classList.remove('popup_visible');
  }
}

buttonOpen.addEventListener('click', popupOpen);
buttonSubmit.addEventListener('click', popupSubmit);
buttonClose.addEventListener('click', popupClose);
popup.addEventListener('click', popupClose);



