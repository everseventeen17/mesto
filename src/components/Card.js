export class Card {
  constructor(data, cardSelector, userId, handleCardClick,
    handleDeleteButtonClick, handleAddLike, handleRemoveLike) {
    this._data = data // объект данных карточки
    this._name = data.name; // текст карточки
    this._link = data.link; // ссылка на картинку в карточке
    this._cardSelector = cardSelector; // template элемент
    this._userId = userId; // id текущего пользователя
    this._cardId = data._id; // id карточки
    this._ownerId = data.owner._id; // id пользователя, создавшего карточку
    this._handleAddLike = handleAddLike; // функция поставить лайк
    this._handleRemoveLike = handleRemoveLike; // функция удалить лайк
    this._handleCardClick = handleCardClick; // функция открыть модальное окно PHOTO
    this._handleDeleteButtonClick = handleDeleteButtonClick; // функция открыть модальное CONFIRM для удаления карточки
  }

  // метод проверяет есть ли лайк пользователя возвращает true / false
  _cardIsLiked() {
    // console.log(this._likeArray)
    return this._likeArray.some((like) => like._id === this._userId);

  }

  // метод добавления / удаления лайка
  _toggleLike() {
    if (this._cardIsLiked()) {
      this._handleRemoveLike(this._cardId); // передает id карточки убрать лайк
    } else {
      this._handleAddLike(this._cardId); // передает id карточки добавить лайк
    }
  }

  // публичный метод рендера лайков
  renderLikes(data) {
    this._likeArray = data.likes;
    if (this._likeArray.length === 0) {
      this._elementLikeCounter.textContent = ''
      this._elementLikeCounter.classList.remove('element__btn-like_active')
    } else {
      this._elementLikeCounter.textContent = this._likeArray.length
      this._elementLikeCounter.classList.add('element__like-counter_active')
    }
    if (this._cardIsLiked()) {
      this._elementLikeButton.classList.add('element__btn-like_active')
    } else {
      this._elementLikeButton.classList.remove('element__btn-like_active')
    }
  }

  //метод, который рендерит элемент карточки.
  generateCard() {
    this._element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    this._elementImage = this._element.querySelector('.element__img');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementLikeButton = this._element.querySelector('.element__btn-like');
    this._elementDeleteButton = this._element.querySelector('.element__delete-button');
    this._elementLikeCounter = this._element.querySelector('.element__like-counter');
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this.renderLikes(this._data); // рендерим лайки
    this._setEventListeners();

    return this._element;
  }

  //слушатели событий карточки
  _setEventListeners() {
    // слушатель лайк карточки
    this._elementLikeButton.addEventListener('click', () => {
      this._toggleLike()
    })

    // слушватель удаление карточки
    if (this._userId === this._ownerId) { // проверяем кто создал карточку
      this._elementDeleteButton.addEventListener('click', () => { // слушатель удаления карточки
        this._handleDeleteButtonClick(this._element, this._cardId)
      })
    } else {
      this._elementDeleteButton.remove() // убираем кнопку удаления
    };

    // слушатель открыть модальное окно PHOTO
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }
}
