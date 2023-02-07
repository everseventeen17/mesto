import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackFormSubmit) {
    super(popupSelector); // popupSelector наследует от Popup
    this._callbackFormSubmit = callbackFormSubmit; //callback сабмита формы
    this._popupForm = this._popup.querySelector('.popup__form'); // форма модального окна
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input-text')); // инпуты модального окна
    this._submitButton = this._popupForm.querySelector('.popup__submit-btn') // кнопка сабмита формы
  }
  // Добавить точки сохранения
  addSavingDots(text = 'Сохранение...') {
    this._submitButton.textContent = text
    this._submitButton.disabled = true
  }
  // убрать точки сохранения
  removeSavingDots(text = 'Сохранить') {
    this._submitButton.textContent = text;
    this._submitButton.disabled = false
  }

  // приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(inputItem => {
      inputValues[inputItem.name] = inputItem.value;
    });
    return inputValues;
  };

  // Перезаписывает родительский метод close
  close() {
    this._popupForm.reset(); //при закрытии попапа форма сбрасываeтся.
    super.close();
  };

  // Перезаписывает родительский метод setEventListeners
  setEventListeners() {
    super.setEventListeners(); // setEventListeners наследует от Popup
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackFormSubmit(this._getInputValues());
    });
  };
}
