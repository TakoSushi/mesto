export default class Section {
  constructor ({ renderer }, selector) {
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach( item => this._renderer(item));
  }

  addItem(element, boolean) {
    if (boolean){
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}