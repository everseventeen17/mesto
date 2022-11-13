const popupElement = document.querySelector('.popup');
    const popupOpenButton = document.querySelector('.profile__edit-button');
    const popupCloseButton = popupElement.querySelector('.popup__close-btn');
    const formSubmitHandler = document.querySelector('.popup__form');
    const nameInput = document.querySelector('.popup__input-text_name');
    const jobInput = document.querySelector('.popup__input-text_job');
    const nameProfile = document.querySelector('.profile__name');
    const jobProfile = document.querySelector('.profile__job');
    const openPopup = function () {
      popupElement.classList.add('popup_opened');
      nameInput.value = nameProfile.textContent;
      jobInput.value = jobProfile.textContent;
    }
    const closePopup = function () {
      popupElement.classList.remove('popup_opened');
    }
    const closePopupByClickOnOwerlay = function (event) {
      if (event.target === event.currentTarget) {
        closePopup();
      }
    }
    const replaceTitle = function (event) {
      event.preventDefault();
      nameProfile.textContent = nameInput.value;
      jobProfile.textContent = jobInput.value;
      closePopup();
    }
    popupOpenButton.addEventListener('click', openPopup);
    popupCloseButton.addEventListener('click', closePopup);
    popupElement.addEventListener('click', closePopupByClickOnOwerlay);
    formSubmitHandler.addEventListener('submit', replaceTitle);
