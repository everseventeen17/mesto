// Импорт CSS
import './index.css';

// Импорт Классов
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupConfirm } from '../components/PopupConfirm.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

// Импорт constants
import {
  popupProfileOpenButton, popupProfileForm,
  popupProfileNameInput, popupProfileJobInput,
  nameProfile, jobProfile, popupPlaceOpenButton,
  popupPlaceForm, elementContainer, validationConfig,
  popupAvatarOpenButton, popupAvatarForm,
  apiData,
  avatarProfile,
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
  avatar: avatarProfile,
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
  const newUserInfo = userInfo.getUserInfo();
  popupProfileNameInput.value = newUserInfo.name;
  popupProfileJobInput.value = newUserInfo.job;
};

// функция редактирования профиля
function handleEditProfileData(profileData) {
  popupProfile.addSavingDots() // добавляем точки
  api.patchProfileData(profileData) // редактируем данные профиля на сервере
    .then((data) => {
      userInfo.setUserInfo({ // устанавливаем данные профиля в соответствии с серверными
        name: data.name,
        job: data.about,
      })
      popupProfile.close(); // закрываем модальное окно PROFILE
    })
    .catch((error) => {
      console.log(error) // ошибки попадающие в catch
    })
    .finally(() => {
      popupProfile.removeSavingDots() // убираем точки
    })
};

// ========================MODAL WINDOW AVATAR========================

const popupAvatar = new PopupWithForm('.popup_type_avatar', handleProfileAvatar)
popupAvatar.setEventListeners();

// функция обновления аватара
function handleProfileAvatar(avatarUrl) {
  popupAvatar.addSavingDots() // добавляем точки
  api.patchAvatar(avatarUrl) // обновляем ссылку Аватара на сервере
    .then((data) => {
      userInfo.setUserAvatar(data.avatar) // устанавливаем avatar.src в соответствии с сервером
      popupAvatar.close() // закрываем модальное окно AVATAR
    })
    .catch((error) => {
      console.log(error) // ошибки попадающие в catch
    })
    .finally(() => {
      popupAvatar.removeSavingDots() // убираем точки
    })
}

const popupAvatarFormValidator = new FormValidator(validationConfig, popupAvatarForm)
popupAvatarFormValidator.enableValidation();

popupAvatarOpenButton.addEventListener('click', function () {
  popupAvatar.open(); // открыть модальное окно AVATAR
  popupAvatarFormValidator.resetValidation() // reset формы валидации AVATAR
})



// ========================MODAL WINDOW PLACE========================
const popupPlace = new PopupWithForm('.popup_type_place', handleEditPlaceData);
popupPlace.setEventListeners();

// функция добавления пользовательской карточки
function handleEditPlaceData(placeData) {
  popupPlace.addSavingDots('Создание...')
  api.postNewCard({
    name: placeData.placeName,
    link: placeData.placeUrl
  })
    .then((data) => {
        cardsDefault.addItem(createCard(data))
        popupPlace.close();
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      popupPlace.removeSavingDots('Создать')
    })
}

// объект валидации формы PLACE
const popupPlaceFormValidator = new FormValidator(validationConfig, popupPlaceForm);
popupPlaceFormValidator.enableValidation();

// слушатель PLACE modal window OPEN BUTTON
popupPlaceOpenButton.addEventListener('click', function () {
  popupPlace.open(); // открыть модальное окно PLACE
  popupPlaceFormValidator.resetValidation(); // // reset формы валидации PLACE
});



//========================= POPUP CONFIRM=============================
const popupConfirm = new PopupConfirm('.popup_type_confirm', handleDeleteCard)
popupConfirm.setEventListeners()

function handleDeleteCard(cardToDelete, cardId) {
  api.deleteCard(cardId)
    .then(() => {
      cardToDelete.remove();
      popupConfirm.close()
    })
    .catch((error) => {
      console.log(error)
      
    })
}

function openConfirmPopup(cardElement, cardId) {
  popupConfirm.open(cardElement, cardId)
}

//========================CARD RENDER========================
let userId // переменная id пользователя
// функция создания карточек
function createCard(cardData) {
  const card = new Card(cardData, '.template', userId, openPhotoPopup, openConfirmPopup,
    //  =================addLike==============
    function handleLike(cardId) {
      api.putLike(cardId)
        .then((data) => {
          card.renderLikes(data)
        })
        .catch((error) => console.log(error));
    },
    //  =================removeLike==============
    function removeLike(cardId) {
      api.deleteLike(cardId)
        .then((data) => {
          card.renderLikes(data)
        })
    }
  );
  return card.generateCard();
}

// обход массива elementList, рендер карточек по умолчанию
const cardsDefault = new Section({
  renderer: (cardData) => {
    cardsDefault.addItem(createCard(cardData));
  }
},
  elementContainer);



//========================API========================
const api = new Api(apiData)

Promise.all([api.getProfileData(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userId = userData._id
    cardsDefault.renderItems(cardData) // рендерим карточки с сервера
    userInfo.setUserAvatar(userData.avatar) // устанавливаем аватар
    userInfo.setUserInfo({ // устанавливаем данные профиля в соответствии с серверными
      name: userData.name,
      job: userData.about,
    })
  })
