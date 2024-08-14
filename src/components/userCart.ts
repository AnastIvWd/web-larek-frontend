import {EventEmitter} from './base/events';
import {EventNamesEnum} from '../utils/constants';

export class UserCart {
  private _view: HTMLElement;
  private events: EventEmitter;

  get view() {
    return this._view;
  }

  constructor (eventEmmiter: EventEmitter) {
    this.events = eventEmmiter;
    this._view = document.querySelector('.header__basket')
    this.view.addEventListener('click', () => this.events.emit(EventNamesEnum.OPEN_CART))
  }

  setUserCart(itemsCount: number) {
    const counter = this.view.querySelector('.header__basket-counter');
    counter.innerHTML = `${itemsCount}`;
  }
}