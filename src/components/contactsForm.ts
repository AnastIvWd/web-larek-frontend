import {Form} from './base/form';
import {EventEmitter} from './base/events';
import {EventNamesEnum} from '../utils/constants';
import {TOrderContacts} from '../types';

export class ContactsForm extends Form<TOrderContacts> {
  constructor(eventEmitter: EventEmitter, templateSelector: string) {
    super(eventEmitter, templateSelector);
    const email = this.getInputByName('email') as HTMLInputElement;
    const phone = this.getInputByName('phone') as HTMLInputElement;
    this.formValues.email = '';
    this.formValues.phone = '';

    email.addEventListener('input', evt => {
      this.formValues.email = (evt.currentTarget as HTMLInputElement).value;
      this.events.emit(EventNamesEnum.VALIDATIOM_FORM_CONTACTS, this.formValues)
    })

    phone.addEventListener('input', evt => {
      this.formValues.phone = (evt.currentTarget as HTMLInputElement).value;
      this.events.emit(EventNamesEnum.VALIDATIOM_FORM_CONTACTS, this.formValues)
    })

    this.view.addEventListener('submit', evt => {
      evt.preventDefault();
      this.events.emit(EventNamesEnum.SUBMIT_FORM_CONTACTS, this.formValues)
    })
  }

  resetForm() {
    this.resetFormInputs()
    Object.keys(this.formValues).forEach(key => {
      this.formValues[key as keyof TOrderContacts] = ''
    })
  }
}