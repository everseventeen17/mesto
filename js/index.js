import elementList from './cards.js';
// CONSTANTS попап и формы

const popupElement = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popupElement.querySelector('.popup__close-btn');
const formSubmitHandler = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input-text_type_name');
const jobInput = document.querySelector('.popup__input-text_type_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

// функции открытия, закрытия попап

const openPopup = function () {
  popupElement.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
}

// функция замены данных профиля

const replaceTitle = function (event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formSubmitHandler.addEventListener('submit', replaceTitle);

// constants popup-place//

const popupPlaceCloseButton = document.querySelector('.popup__close-btn_type_place');
const popupPlaceElement = document.querySelector('.popup_type_place');
const popupPlaceOpenButton = document.querySelector('.profile__add-button');

// функции открытия, закрытия попап-место

const openPlacePopup = function () {
  popupPlaceElement.classList.add('popup_opened');
}

const closePlacePopup = function () {
  popupPlaceElement.classList.remove('popup_opened');
}

popupPlaceOpenButton.addEventListener('click', openPlacePopup);
popupPlaceCloseButton.addEventListener('click', closePlacePopup);



// Дом узлы

const elementContainer = document.querySelector('.elements');
const placeForm = document.querySelector('.popup__form_type_place');
const titleInput = document.querySelector('.popup__input-text_type_title');
const urlPlaceImageInput = document.querySelector('.popup__input-text_type_url')
const placeSubmitButton = document.querySelector('.popup__submit-btn_type_place');

// Шаблоны

const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
console.log(elementTemplate);

// Удаление фото-карточки

const handleDeleteElement = (evt) => {
  evt.target.closest('.element').remove();
}

// Like карточки

const handleLikeElement = (evt) => {
  evt.target.classList.toggle('element__btn-like_active');
}

// CONSTANTS попап фото-карточки

const popupPhotoElement = document.querySelector('.popup_type_photo');
const popupPhotoCloseButton = document.querySelector('.popup__close-btn_type_photo');
const popupPhotoTitle = document.querySelector('.popup__text');
const popupPhotoImage = document.querySelector('.popup__image');
const closeImagePopup = function () {
  popupPhotoElement.classList.remove('popup_opened');
}

popupPhotoCloseButton.addEventListener('click', closeImagePopup);

// Генерация карточки

const generateElement = (dataCard) => {
  const newElement = elementTemplate.cloneNode(true);
  const placeTitle = newElement.querySelector('.element__title');
  const placeImage = newElement.querySelector('.element__img');
  placeTitle.textContent = dataCard.name;
  placeImage.src = dataCard.link;
  const deleteButton = newElement.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', handleDeleteElement);
  const likeButton = newElement.querySelector('.element__btn-like');
  likeButton.addEventListener('click', handleLikeElement);
  const openButtonImage = newElement.querySelector('.element__img');
  const openImagePopup = function () {
    popupPhotoElement.classList.add('popup_opened');
    popupPhotoImage.src = placeImage.src;
    popupPhotoTitle.textContent = placeTitle.textContent;
  }
  openButtonImage.addEventListener('click', openImagePopup);
  return newElement;
}

// Добавление карточки
const renderCard = (dataCard) => {
  elementContainer.prepend(generateElement(dataCard));
};

// Рендер всех карточек

elementList.forEach((dataCard) => {
  renderCard(dataCard);
});
// Обработчики событий

const handleElementTitle = (event) => {
  event.preventDefault();
  renderCard({
    link: urlPlaceImageInput.value,
    name: titleInput.value,
  })
  closePlacePopup();
}

placeForm.addEventListener('submit', handleElementTitle);
