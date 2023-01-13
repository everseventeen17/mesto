// Импорт CSS
import './index.css';

// Импорт Классов
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

// Импорт constants
import {
  popupProfileOpenButton, popupProfileForm,
  popupProfileNameInput, popupProfileJobInput,
  nameProfile, jobProfile, popupPlaceOpenButton,
  popupPlaceForm, elementContainer,
  validationConfig, elementList
} from '../utils/constants.js';


// =======================MODAL WINDOW PHOTO========================
// constants PHOTO modal window

const popupPhoto = new PopupWithImage('.popup_type_photo');
popupPhoto.setEventListeners();
// открыть popup PHOTO modal window
function openPhotoPopup(name, image) {
  popupPhoto.open(name, image);
};


// ========================MODAL WINDOW PROFILE========================

// Данные PROFILE
const userInfo = new UserInfo({
  name: nameProfile,
  job: jobProfile,
});

const popupProfile = new PopupWithForm('.popup_type_profile', handleEditProfileData);
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
function handleEditProfileData(profileData) {
  userInfo.setUserInfo({
    name: profileData.profileName,
    job: profileData.profileUserAbout
  });
  popupProfile.close();
};


// ========================MODAL WINDOW PLACE========================
const popupPlace = new PopupWithForm('.popup_type_place', handleEditPlaceData);
popupPlace.setEventListeners();

// функция добавления пользовательской карточки
function handleEditPlaceData(placeData) {
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
