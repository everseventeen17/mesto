export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице.
    this._containerSelector = containerSelector; //селектор контейнера, в который нужно добавлять созданные элементы.
  }

  // публичный метод, принимает массив карточек с сервера, отвечает за отрисовку всех элементов.
  renderItems(items) {
    items.reverse() // реверсируем массив для коректного отображения карточек
    items.forEach((item) => {
      this._renderer(item)
    });
  };

  // публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._containerSelector.prepend(element);
  }
};
