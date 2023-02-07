// ========================MODAL WINDOW PROFILE========================
// constants PROFILE modal window
const popupProfileElement = document.querySelector('.popup_type_profile'); // модальное окно PROFILE
export const popupProfileOpenButton = document.querySelector('.profile__edit-button'); // кнопка открыть модальное окно PROFILE
export const popupProfileForm = popupProfileElement.querySelector('.popup__form_type_profile'); // форма модального окна PROFILE
export const popupProfileNameInput = popupProfileElement.querySelector('.popup__input-text_type_name'); // инпут имени модального окна PROFILE
export const popupProfileJobInput = popupProfileElement.querySelector('.popup__input-text_type_job'); // инпут о себе модального окна PROFILE
// constants профиля, которые отображаются на странице
export const nameProfile = document.querySelector('.profile__name'); // имя пользователя
export const jobProfile = document.querySelector('.profile__job'); // информация о себе

// ========================MODAL WINDOW AVATAR========================
const popupAvatarElement = document.querySelector('.popup_type_avatar');
export const popupAvatarOpenButton = document.querySelector('.profile__avatar-button');
export const popupAvatarForm = popupAvatarElement.querySelector('.popup__form_type_avatar');
export const popupAvatarUrlInput = popupAvatarElement.querySelector('.popup__input-text_type_url');
// constants аватара, которые отображаются на странице
export const avatarProfile = document.querySelector('.profile__avatar');


// ========================MODAL WINDOW PLACE========================
// constants PLACE modal window
const popupPlaceElement = document.querySelector('.popup_type_place'); // модальное окно PLACE
export const popupPlaceOpenButton = document.querySelector('.profile__add-button'); // кнопка открыть модальное окно PLACE
export const popupPlaceForm = popupPlaceElement.querySelector('.popup__form_type_place'); // форма модального окна PLACE


//========================CARD RENDER========================
export const elementContainer = document.querySelector('.elements'); // Дом узлы


// классы и селекторы элементов форм
export const validationConfig = {
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__error_visible'
};
// объект данных API
export const apiData = {
  link: 'https://nomoreparties.co/v1/cohort-59/',
  headers: {
    authorization: 'aa5af5a1-1216-4f7a-ab40-da79c3d78455',
    'Content-Type': 'application/json'
  }
}
