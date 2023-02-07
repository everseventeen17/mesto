import { Popup } from './Popup.js';
export class PopupConfirm extends Popup {
  constructor(popupSelector, callbackConfirm) {
    super(popupSelector); // popupSelector наследует от Popup
    this._callbackConfirm = callbackConfirm; //callback сабмита формы
    this._submitButton = this._popup.querySelector('.popup__submit-btn_type_confirm')
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  };
  setEventListeners() {
    this._submitButton.addEventListener('click', () => {
      this._callbackConfirm(this._card, this._cardId);
    })
    super.setEventListeners()
  }
}
