export class Api {
  constructor(apiData) { // принимает объект с ссылкой и токеном
    this._link = apiData.link; // ссылка идентификатор группы cohort-59
    this._headers = apiData.headers; // токен
  }

  // 1. Загрузка информации о пользователе с сервера
  getProfileData() {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: 'GET',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        };
      })
  };

  // 2. Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: 'GET',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        };
      })
  };

  // 3. Редактирование профиля
  patchProfileData(profileData) {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name: profileData.profileName, about: profileData.profileUserAbout })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        };
      })
  };

  // 4. Добавление новой карточки
  postNewCard({ name, link }) {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        };
      })
  };

  // 5. Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        };
      })
  };

  // 6. Постановка и снятие лайка
  // публичный метод добавить лайк на сервер
  putLike(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        };
      })
  };

  // публичный метод убрать лайк с сервера
  deleteLike(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        };
      })
  };

  // 7. Обновление аватара пользователя
  patchAvatar(avatarUrl) {
    return fetch(`${this._link}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatarUrl.avatarUrl })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        };
      })
  };
}
