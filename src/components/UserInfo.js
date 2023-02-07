export class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = name; // элемент имени пользователя
    this._job = job; // элемент информации о себе
    this._avatar = avatar;
  }

  // публичный метод getUserInfo, который возвращает объект с данными пользователя.
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    };
  };

  // публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
// публичный метод setUserAvatar, который принимает новые данные аватара их на страницу.
  setUserAvatar(avatarUrl) {
    this._avatar.src = avatarUrl;
  }

};
