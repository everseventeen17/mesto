// импорты
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

// классы и селекторы элементов форм
export const validationConfig = {
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__error_visible'
};

// Массив карточек по умолчанию
const elementList = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// функции открытия, закрытия попапов

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handlePressOnEsc);
};

const popups = Array.from(document.querySelectorAll('.popup'))

popups.forEach((popup) => {
  popup.addEventListener('mousedown', handleClickOnOverlay);
})

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePressOnEsc);

};

const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

popupCloseButtons.forEach((popupCloseButton) =>
  popupCloseButton.addEventListener('click', () => {
    closePopup(popupCloseButton.closest('.popup'));
  })
);

// функции открытия, закрытия попапов по нажатии ESC, overlay
function handlePressOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

function handleClickOnOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
};

// constants попап, формы profile
const popupProfileElement = document.querySelector('.popup_type_profile');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileEditForm = popupProfileElement.querySelector('.popup__form_type_profile');
const popupProfileNameInput = popupProfileElement.querySelector('.popup__input-text_type_name');
const popupProfileJobInput = popupProfileElement.querySelector('.popup__input-text_type_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const popupProfileSubmitButton = popupProfileElement.querySelector('.popup__submit-btn_type_profile');

// функция открытия, попап profile
function openProfilePopup() {
  popupProfileNameInput.value = nameProfile.textContent;
  popupProfileJobInput.value = jobProfile.textContent;
  // функция сброса submitButton модального окна PROFILE
  popupProfileFormValidator._disableButton(popupProfileSubmitButton);
  // функция сброса ERRORS модального окна PROFILE
  popupProfileFormValidator._resetErrors();
  openPopup(popupProfileElement);
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
const popupPlaceUrlInput = popupPlaceElement.querySelector('.popup__input-text_type_url');
const popupPlaceSubmitButton = document.querySelector('.popup__submit-btn_type_place');

// функция открытия, popup-place
function openPlacePopup() {
  popupPlaceTitleInput.value = '';
  popupPlaceUrlInput.value = '';
  // функция сброса submitButton модального окна PLACE
  popupPlaceFormValidator._disableButton(popupPlaceSubmitButton);
  // функция сброса ERRORS модального окна PLACE
  popupPlaceFormValidator._resetErrors();
  openPopup(popupPlaceElement);
};

popupPlaceOpenButton.addEventListener('click', openPlacePopup);

// constants попап photo
const popupPhotoElement = document.querySelector('.popup_type_photo');
const popupPhotoTitle = popupPhotoElement.querySelector('.popup__text');
const popupPhotoImage = popupPhotoElement.querySelector('.popup__image');

// функция открытия, popup-photo
const openImagePopup = function (title, link) {
  openPopup(popupPhotoElement);
  popupPhotoTitle.textContent = title;
  popupPhotoImage.src = link;
  popupPhotoImage.alt = title;
}

// объект валидации формы PLACE
const popupPlaceFormValidator = new FormValidator(validationConfig, popupPlaceForm);
popupPlaceFormValidator.enableValidation();

// объект валидации формы PROFILE
const popupProfileFormValidator = new FormValidator(validationConfig, popupProfileEditForm);
popupProfileFormValidator.enableValidation();

// Дом узлы
const elementContainer = document.querySelector('.elements');

// обход массива elementList, рендер карточек по умолчанию
elementList.forEach((element) => {
  const card = new Card(element, '#element-template', openImagePopup);
  const newCard = card.renderCard();
  elementContainer.prepend(newCard);
});

//функция создания новой карточки пользователем
function addNewCard(evt) {
  evt.preventDefault();
  //объект данных, полученный от пользователя
  const receivedUserData = {
    name: popupPlaceTitleInput.value,
    link: popupPlaceUrlInput.value,
  };
  //создание новой карточки
  const card = new Card(receivedUserData, '#element-template', openImagePopup);
  const newCard = card.renderCard();
  elementContainer.prepend(newCard);
  // очистка полей, закрытие попапа PLACE
  popupPlaceTitleInput.value = '';
  popupPlaceUrlInput.value = '';
  closePopup(popupPlaceElement);
}

popupPlaceForm.addEventListener('submit', addNewCard);



