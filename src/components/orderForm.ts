import {Form} from './base/form';
import {EventEmitter} from './base/events';
import {EventNamesEnum} from '../utils/constants';
import {TPaymentInfo} from '../types';

export class OrderForm extends Form<TPaymentInfo> {
  private cashBtn: HTMLButtonElement;
  private cardBtn: HTMLButtonElement;

  constructor(eventEmitter: EventEmitter, templateSelector: string) {
    super(eventEmitter, templateSelector);
    this.cashBtn = this.getInputByName('cash') as HTMLButtonElement;
    this.cardBtn = this.getInputByName('card') as HTMLButtonElement;
    const address = this.getInputByName('address') as HTMLInputElement;
    this.formValues.address = '';
    this.formValues.payment = '';

    this.cashBtn.addEventListener('click', () => {
      this.cashBtn.classList.add('button_alt-active');
      this.cardBtn.classList.remove('button_alt-active');
      this.formValues.payment = 'cash'
      this.events.emit(EventNamesEnum.VALIDATIOM_FORM_ORDER, this.formValues)
    })

    this.cardBtn.addEventListener('click', () => {
      this.cardBtn.classList.add('button_alt-active');
      this.cashBtn.classList.remove('button_alt-active');
      this.formValues.payment = 'card'
      this.events.emit(EventNamesEnum.VALIDATIOM_FORM_ORDER, this.formValues)
    })

    address.addEventListener('input', evt => {
      this.formValues.address = (evt.currentTarget as HTMLInputElement).value;
      this.events.emit(EventNamesEnum.VALIDATIOM_FORM_ORDER, this.formValues)
    })

    this.view.addEventListener('submit', evt => {
      evt.preventDefault();
      this.events.emit(EventNamesEnum.SUBMIT_FORM_ORDER, this.formValues)
    })
  }

  resetForm() {
    this.resetFormInputs()
    Object.keys(this.formValues).forEach(key => {
      this.formValues[key as keyof TPaymentInfo] = ''
    })

    this.cashBtn.classList.remove('button_alt-active');
    this.cardBtn.classList.remove('button_alt-active');
  }
}