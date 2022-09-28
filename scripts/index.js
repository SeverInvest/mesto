const popupButtonOpen = document.querySelector('.traveler__button-correct');
const popup = document.querySelector('.popup');
let nameOld = document.querySelector('.traveler__name');
let aboutOld = document.querySelector('.traveler__about');
let nameNew = popup.querySelector('.popup__input_type_name');
let aboutNew = popup.querySelector('.popup__input_type_about');
const popupButtonSubmit = popup.querySelector('.popup__submit');
const popupButtonClose = popup.querySelector('.popup__close');

function popupSubmit(event) {
  event.preventDefault();
  nameOld.textContent = nameNew.value;
  aboutOld.textContent = aboutNew.value;
  popupClose(event);
}

function popupOpen(event) {
  nameNew.value = nameOld.textContent;
  aboutNew.value = aboutOld.textContent;
  popup.classList.add('popup_visible');
}

function popupClose(event) {
  if (event.target == event.currentTarget) {
    popup.classList.remove('popup_visible');
  }
}

popupButtonOpen.addEventListener('click', popupOpen);
popupButtonSubmit.addEventListener('click', popupSubmit);
popupButtonClose.addEventListener('click', popupClose);
popup.addEventListener('click', popupClose);



