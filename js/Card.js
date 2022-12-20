export class Card {
  constructor(data, cardSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }

  // метод Like фото-карточки
  _handleLikeElement = () => {
    this._elementLikeButton.classList.toggle('element__btn-like_active');
  }

  // метод удаление фото-карточки
  _handleDeleteElement = () => {
    this._element.remove();
  }

  //слушатели событий карточки
  _setEventListeners() {
    // слушатель лайк карточки
    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeElement()
    });
    // слушатель удалить карточку
    this._elementDeleteButton.addEventListener('click', () => {
      this._handleDeleteElement()
    });
    // слушатель открыть модальное окно PHOTO
    this._elementImage.addEventListener('click', () => {
      this._openPopup(this._name, this._link)
    });
  }

    //метод, который рендерит элемент карточки.
    renderCard() {
      this._element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      this._elementImage = this._element.querySelector('.element__img');
      this._elementTitle = this._element.querySelector('.element__title');
      this._elementLikeButton = this._element.querySelector('.element__btn-like');
      this._elementDeleteButton = this._element.querySelector('.element__delete-button');

      this._elementTitle.textContent = this._name;
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
      this._setEventListeners();

      return this._element;
    }

}
