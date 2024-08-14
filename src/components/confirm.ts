import {EventEmitter} from './base/events';
import {EventNamesEnum} from '../utils/constants';

export class Confirm {
  private _view: HTMLElement;
  private description: HTMLElement;
  private events: EventEmitter

  get view() {
    return this._view;
  }

  constructor(eventEmmiter: EventEmitter) {
    this.events = eventEmmiter;
    const confirm = (document.querySelector('#success') as HTMLTemplateElement).content;
    this._view = confirm.querySelector('.order-success').cloneNode(true) as HTMLElement;
    this.description = this.view.querySelector('.order-success__description');

    const btn = this.view.querySelector('.button');

    btn.addEventListener('click', () => {
      this.events.emit(EventNamesEnum.CLOSE_MODAL);
    });
  }

  setTotal(total: number) {
    this.description.textContent = `Списано ${total} синапсов`
  }
}