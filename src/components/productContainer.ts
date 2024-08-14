export class ProductContainer {
  private _view: HTMLElement;

  get view() {
    return this._view;
  }

  constructor() {
    this._view = document.querySelector('.gallery')
  }

  addProduct(productElement: HTMLElement) {
    this._view.appendChild(productElement);
  }
}