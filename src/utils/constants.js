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

// Массив карточек по умолчанию
export const elementList = [
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
