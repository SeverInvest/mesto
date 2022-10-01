const profile = document.querySelector('.traveler')
const buttonOpen = profile.querySelector('.traveler__button-correct');
let nameOld = profile.querySelector('.traveler__name');
let aboutOld = profile.querySelector('.traveler__about');

let popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.popup__close');

const profileForm = popup.querySelector('.form');
const buttonSubmit = profileForm.querySelector('.form__submit');
let nameNew = profileForm.querySelector('.form__input_type_name');
let aboutNew = profileForm.querySelector('.form__input_type_about');

function popupSubmit(event) {
  event.preventDefault();
  nameOld.textContent = nameNew.value;
  aboutOld.textContent = aboutNew.value;
  console.log(nameOld.textContent, aboutOld.textContent, nameNew.value, aboutNew.value)
  popupClose(event);
}

function popupOpen() {
  nameNew.value = nameOld.textContent;
  aboutNew.value = aboutOld.textContent;
  popup.classList.add('popup_visible');
}

function popupClose(event) {
  popup.classList.remove('popup_visible');
}

buttonOpen.addEventListener('click', popupOpen);
profileForm.addEventListener('submit', popupSubmit);
buttonClose.addEventListener('click', popupClose);
