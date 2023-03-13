function showInputError(
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  formError.classList.add(errorClass);
  formError.textContent = errorMessage;
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  formError.classList.remove(errorClass);
  formError.textContent = "";
}

function checkWhitespaces(input) {
  const reg = /\S\S+/;
  return reg.test(input.value);
}

function toggleButtonState(
  formElement,
  inputElement,
  { submitButtonSelector, inactiveButtonClass }
) {
  const buttonSubmit = formElement.querySelector(submitButtonSelector);

  const formIsValid = formElement.checkValidity();

  if (formIsValid && checkWhitespaces(inputElement)) {
    buttonSubmit.classList.remove(inactiveButtonClass);
    buttonSubmit.removeAttribute("disabled");
  } else {
    buttonSubmit.classList.add(inactiveButtonClass);
    buttonSubmit.setAttribute("disabled", true);
  }
}

function isValid(formElement, inputElement, rest) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      rest
    );
  } else if (checkWhitespaces(inputElement)) {
    hideInputError(formElement, inputElement, rest);
  }
  toggleButtonState(formElement, inputElement, rest);
}

export function enableValidation({ formSelector, inputSelector, ...rest }) {
  const form = document.querySelector(formSelector);
  const inputElement = form.querySelector(inputSelector);
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    toggleButtonState(form, inputElement, rest);
  });

  const inputList = form.querySelectorAll(inputSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(form, inputElement, rest);
    });
  });
}

export const validationSet = {
  formSelector: ".form",
  inputSelector: ".form__input_active",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

enableValidation(validationSet);
