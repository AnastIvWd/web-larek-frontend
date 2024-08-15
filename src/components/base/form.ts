import {EventEmitter} from './events';

export class Form<T> {
  protected _view: HTMLFormElement;
  private error: HTMLElement;
  private submitBtn: HTMLButtonElement;
  protected formValues: T = {} as T;
  private inputEls: NodeListOf<HTMLInputElement>;
  protected events: EventEmitter;

  get view () {
    return this._view;
  }

  constructor(eventEmitter: EventEmitter, templateSelector: string) {
    this.events = eventEmitter;
    
    const formTemplate = (document.querySelector(templateSelector) as HTMLTemplateElement).content;
    this._view = formTemplate.querySelector('.form').cloneNode(true) as HTMLFormElement;
    this.error = this._view.querySelector('.form__errors');
    this.submitBtn = this._view.querySelector('button[type="submit"]');
    this.inputEls = this._view.querySelectorAll('input');
  }

  setCanSubmit(value: boolean) {
    this.submitBtn.disabled = !value;
  }

  getInputByName(attrValue: string) {
    return this._view.querySelector(`[name="${attrValue}"]`);
  }

  setFormErrors(text: string) {
    this.error.textContent = text;
  }

  hideFormErrors() {
    this.error.textContent = '';
  }

  resetFormInputs() {
    this.inputEls.forEach(input => {
      input.value = '';
    });
    this.setCanSubmit(false);
  }
}