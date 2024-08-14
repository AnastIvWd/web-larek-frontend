import {EventEmitter} from './base/events';
import {EventNamesEnum} from '../utils/constants';

export class Cart {
  private _view: HTMLElement;
  private cartTotal: HTMLElement;
  private orderBtn: HTMLButtonElement;
  private events: EventEmitter;

  get view() {
    return this._view;
  }

  constructor(eventEmmiter: EventEmitter) {
    this.events = eventEmmiter;
    const cartTemplate = (document.querySelector('#basket') as HTMLTemplateElement).content;
    this._view = cartTemplate.querySelector('.basket').cloneNode(true) as HTMLElement;
    
    this.orderBtn = this.view.querySelector('.basket__button') as HTMLButtonElement;
    this.cartTotal = this.view.querySelector('.basket__price') as HTMLElement;

    this.orderBtn.addEventListener('click', () => this.events.emit(EventNamesEnum.SUBMIT_CART))
  }
  
  setCartContent(cartEls: HTMLElement[]) {
    const list = this.view.querySelector('.basket__list');
    list.innerHTML = '';
    cartEls.forEach(elem => {
      list.appendChild(elem);
    })
  }

  setCartTotal(total: number) {
    this.cartTotal.textContent = `${total} синапсов`
  }

  setCanCreateOrder(value: boolean) {
    this.orderBtn.disabled = value;
  }
}