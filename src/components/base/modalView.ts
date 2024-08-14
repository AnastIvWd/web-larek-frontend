import {EventEmitter} from './events';
import {EventNamesEnum} from '../../utils/constants';

export class ModalView {
  private _view: HTMLElement;
  private events: EventEmitter;
  private hideButton: HTMLButtonElement;

  get view() {
    return this._view;
  }

  constructor(eventEmmiter: EventEmitter) {
    this._view = document.querySelector('.modal');
    this.hideButton = this._view.querySelector('.modal__close');
    this.events = eventEmmiter

    this.hideButton.addEventListener('click', () => this.events.emit(EventNamesEnum.CLOSE_MODAL))

    this._view.addEventListener('click', evt => {
      const target = evt.target as HTMLElement

      if (!target.closest('.modal__container') && !target.closest('.basket') && !target.classList.contains('basket__item-delete')) {
        this.events.emit(EventNamesEnum.CLOSE_MODAL)
      }
    })

    window.addEventListener('keydown', evt => {
      if (evt.key === 'Escape' && this._view.classList.contains('modal_active')) {
        this.events.emit(EventNamesEnum.CLOSE_MODAL)
      }
    })
  }

  setModalContent(view: HTMLElement) {
    const contentEl = this._view.querySelector('.modal__content');
    contentEl.innerHTML = '';
    contentEl.appendChild(view)
  }

  show() {
    this._view.classList.add('modal_active');
    document.body.style.overflow = 'hidden';
  }

  hide() {
    this._view.classList.remove('modal_active');
    document.body.style.overflow = 'auto';
  }
}