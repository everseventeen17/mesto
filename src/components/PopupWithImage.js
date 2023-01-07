import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector); // наследует от Popup
    this._popupText = this._popup.querySelector('.popup__text'); // текст модального окна
    this._popupImage = this._popup.querySelector('.popup__image'); // картинка модального окна
  }

  // перезаписывать родительский метод open, вставлять в попап картинку и подписью к картинке.
  open(text, url) {
    super.open(); // наследует от Popup
    this._popupText.textContent = text;
    this._popupImage.src = url;
    this._popupImage.alt = text;
  };
}
