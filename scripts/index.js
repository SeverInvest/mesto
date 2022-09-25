const popupOpen = document.querySelector('.traveler__button-correct');
let overlay = document.querySelector('.overlay');
let popupNameOld = document.querySelector('.traveler__name');
let popupAboutOld = document.querySelector('.traveler__about');
let popupNameNew = overlay.querySelector('.popup__name');
let popupAboutNew = overlay.querySelector('.popup__about');
const popupSubmit = overlay.querySelector('.popup__submit');

function overlayInvisible(event) {
  if (event.target.className == "traveler__button-correct") {
    popupNameNew.value = popupNameOld.textContent;
    popupAboutNew.value = popupAboutOld.textContent;
  } else {
    event.preventDefault();
    popupNameOld.textContent = popupNameNew.value;
    popupAboutOld.textContent = popupAboutNew.value;
  }
  overlay.classList.toggle('overlay_invisible');
}

popupOpen.addEventListener('click', overlayInvisible);
popupSubmit.addEventListener('click', overlayInvisible);



