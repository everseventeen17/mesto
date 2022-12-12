import elementList from './cards.js';

// функции открытия, закрытия попапов

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handlePressOnEsc);
  popupElement.addEventListener('mousedown', handlePressOnOverlay);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePressOnEsc);

}

const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

popupCloseButtons.forEach((popupCloseButton) =>
  popupCloseButton.addEventListener('click', () => {
    closePopup(popupCloseButton.closest('.popup'));
  })
);


// функции открытия, закрытия попапов по нажатии ESC, overlay

function handlePressOnEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  };
};

function handlePressOnOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
};



// constants попап, формы profile


const popupProfileElement = document.querySelector('.popup_type_profile');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileEditForm = popupProfileElement.querySelector('.popup__form');
const popupProfileNameInput = popupProfileElement.querySelector('.popup__input-text_type_name');
const popupProfileJobInput = popupProfileElement.querySelector('.popup__input-text_type_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

// функция открытия, попап profile

function openProfilePopup() {
  openPopup(popupProfileElement);
  popupProfileNameInput.value = nameProfile.textContent;
  popupProfileJobInput.value = jobProfile.textContent;
}

// функция замены данных profile

function replaceTitle(event) {
  event.preventDefault();
  nameProfile.textContent = popupProfileNameInput.value;
  jobProfile.textContent = popupProfileJobInput.value;
  closePopup(popupProfileElement);
}

popupProfileOpenButton.addEventListener('click', openProfilePopup);
popupProfileEditForm.addEventListener('submit', replaceTitle);

// constants popup-place//

const popupPlaceElement = document.querySelector('.popup_type_place');
const popupPlaceOpenButton = document.querySelector('.profile__add-button');
const popupPlaceForm = popupPlaceElement.querySelector('.popup__form_type_place');
const popupPlaceTitleInput = popupPlaceElement.querySelector('.popup__input-text_type_title');
const popupPlaceUrlInput = popupPlaceElement.querySelector('.popup__input-text_type_url')

// функция открытия, popup-place

function openPlacePopup() {
  openPopup(popupPlaceElement);
  popupPlaceTitleInput.value = '';
  popupPlaceUrlInput.value = '';
}

popupPlaceOpenButton.addEventListener('click', openPlacePopup);

// Дом узлы

const elementContainer = document.querySelector('.elements');

// Шаблоны

const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');

// Удаление фото-карточки

const handleDeleteElement = (evt) => {
  evt.target.closest('.element').remove();
}

// Like фото-карточки

const handleLikeElement = (evt) => {
  evt.target.classList.toggle('element__btn-like_active');
}

// constants попап photo

const popupPhotoElement = document.querySelector('.popup_type_photo');
const popupPhotoTitle = popupPhotoElement.querySelector('.popup__text');
const popupPhotoImage = popupPhotoElement.querySelector('.popup__image');

// Генерация карточки

const generateElement = (dataCard) => {
  const newElement = elementTemplate.cloneNode(true);
  const placeTitle = newElement.querySelector('.element__title');
  const placeImage = newElement.querySelector('.element__img');
  placeTitle.textContent = dataCard.name;
  placeImage.src = dataCard.link;
  placeImage.alt = dataCard.name;
  const deleteButton = newElement.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', handleDeleteElement);
  const likeButton = newElement.querySelector('.element__btn-like');
  likeButton.addEventListener('click', handleLikeElement);
  const openButtonImage = newElement.querySelector('.element__img');
  const openImagePopup = function () {
    openPopup(popupPhotoElement);
    popupPhotoImage.src = placeImage.src;
    popupPhotoTitle.textContent = placeTitle.textContent;
    popupPhotoImage.alt = placeTitle.textContent;
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

const handleAddCard = (event) => {
  event.preventDefault();
  renderCard({
    link: popupPlaceUrlInput.value,
    name: popupPlaceTitleInput.value,
  })
  closePopup(popupPlaceElement);
  popupPlaceTitleInput.value = '';
  popupPlaceUrlInput.value = '';
}

popupPlaceForm.addEventListener('submit', handleAddCard);












