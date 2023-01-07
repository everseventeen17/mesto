// Импорт CSS
import './index.css';

// Импорт Классов
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

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




// =======================MODAL WINDOW PHOTO========================
// constants PHOTO modal window
const popupPhotoElement = document.querySelector('.popup_type_photo');

const popupPhoto = new PopupWithImage(popupPhotoElement);
popupPhoto.setEventListeners();
// открыть popup PHOTO modal window
function openPhotoPopup(name, image) {
  popupPhoto.open(name, image);
};




// ========================MODAL WINDOW PROFILE========================
// constants PROFILE modal window
const popupProfileOpenButton = document.querySelector('.profile__edit-button'); // кнопка открыть модальное окно PROFILE
const popupProfileElement = document.querySelector('.popup_type_profile'); // модальное окно PROFILE
const popupProfileForm = popupProfileElement.querySelector('.popup__form_type_profile'); // форма модального окна PROFILE
const popupProfileNameInput = popupProfileElement.querySelector('.popup__input-text_type_name'); // инпут имени модального окна PROFILE
const popupProfileJobInput = popupProfileElement.querySelector('.popup__input-text_type_job'); // инпут о себе модального окна PROFILE
// constants профиля, которые отображаются на странице
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

// Данные PROFILE
const userInfo = new UserInfo({
  name: nameProfile,
  job: jobProfile,
});

const popupProfile = new PopupWithForm(popupProfileElement, popupProfileHanler);
popupProfile.setEventListeners();

// объект валидации формы PROFILE
const popupProfileFormValidator = new FormValidator(validationConfig, popupProfileForm);
popupProfileFormValidator.enableValidation();

// слушатель PROFILE modal window OPEN BUTTON
popupProfileOpenButton.addEventListener('click', function () {
  popupProfile.open(); // открыть модальное окно
  handleInputTextProfile(); // функция заполнения полей формы данными из профиля
  popupProfileFormValidator.resetValidation(); // reset формы валидации PROFILE
});

// функция заполнения полей input модального окна PROFILE данными из профиля
function handleInputTextProfile() {
  const NewUserInfo = userInfo.getUserInfo();
  popupProfileNameInput.value = NewUserInfo.name;
  popupProfileJobInput.value = NewUserInfo.job;
};

// функция редактирования профиля
function popupProfileHanler(profileData) {
  userInfo.setUserInfo({
    name: profileData.profileName,
    job: profileData.profileUserAbout
  });
  popupProfile.close();
};




// ========================MODAL WINDOW PLACE========================
// constants PLACE modal window
const popupPlaceElement = document.querySelector('.popup_type_place'); // модальное окно PLACE
const popupPlaceOpenButton = document.querySelector('.profile__add-button'); // кнопка открыть модальное окно PLACE
const popupPlaceForm = popupPlaceElement.querySelector('.popup__form_type_place'); // форма модального окна PLACE

const popupPlace = new PopupWithForm(popupPlaceElement, popupPlaceHandler);
popupPlace.setEventListeners();

// функция добавления пользовательской карточки
function popupPlaceHandler(placeData) {
  cardsDefault.addItem(createCard({
    name: placeData.placeName,
    link: placeData.placeUrl
  }));
  popupPlace.close();
}

// объект валидации формы PLACE
const popupPlaceFormValidator = new FormValidator(validationConfig, popupPlaceForm);
popupPlaceFormValidator.enableValidation();

// слушатель PLACE modal window OPEN BUTTON
popupPlaceOpenButton.addEventListener('click', function () {
  popupPlace.open(); // открыть модальное окно PLACE
  popupPlaceFormValidator.resetValidation(); // // reset формы валидации PLACE
});




//========================CARD RENDER========================
// Дом узлы
const elementContainer = document.querySelector('.elements');

// функция создания карточек
const createCard = function (element) {
  const card = new Card(element, '.template', openPhotoPopup);
  return card.generateCard();
}

// обход массива elementList, рендер карточек по умолчанию
const cardsDefault = new Section({
  items: elementList,
  renderer: (element) => {
    cardsDefault.addItem(createCard(element));
  }
},
  elementContainer);

cardsDefault.renderItems();
