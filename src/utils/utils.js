import PARAMS from "./params.js";

export function renderLoading(popup, isProcess, buttonSubmitText) {
    const buttonSubmit = popup.querySelector(PARAMS.submitButtonSelector);
    if (isProcess) {
      buttonSubmit.textContent = "Сохранение...";
    } else {
      buttonSubmit.textContent = buttonSubmitText;
    }
  };

  export function isError(error) {
    console.log(error);
  };