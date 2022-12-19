export class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._formElement = formElement
  }

  // Показать ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.popup__error_${inputElement.name}`);
    inputElement.classList.add(this._inputErrorClass)
    errorElement.classList.add(this._errorClass)
    errorElement.textContent = errorMessage
  }

  // Спрятать ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.popup__error_${inputElement.name}`);
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = ''
  }

  // сбросить ошибки
  _resetErrors() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    }
    )
  };

  //Проверка Валилдности полей INPUT
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else
      this._hideInputError(inputElement)
  }

  //Проверка одного поля на валидность
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  //Блокировка кнопки SUBMIT
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement)
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass)
      buttonElement.disabled = false
    }
  }

  _disableButton(buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add(this._inactiveButtonClass);
  };

  // Слушатели событий
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState(inputList, buttonElement);
      })
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
}
