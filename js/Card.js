export class Card {
  constructor(data, cardSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }

  //метод, который рендерит элемент карточки.
  renderCard() {
    // Шаблон карточки
    this._element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  //слушатели событий карточки
  _setEventListeners() {
    // слушатель лайк карточки
    this._element.querySelector('.element__btn-like').addEventListener('click', () => {
      this._handleLikeElement()
    });
    // слушатель удалить карточку
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteElement()
    });
    // слушатель открыть модальное окно PHOTO
    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._openPopup(this._name, this._link)
    });
  }

  // метод Like фото-карточки
  _handleLikeElement = () => {
    this._element.querySelector('.element__btn-like').classList.toggle('element__btn-like_active');
  }

  // метод удаление фото-карточки
  _handleDeleteElement = () => {
    this._element.remove();
  }
}
