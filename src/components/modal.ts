import { IEvents } from "./base/events"
class ModalView {
  view: HTMLElement;
  events: IEvents;
  constructor(id: string, events: IEvents) {
    this.view = document.querySelector(id);
    this.events = events;
  }

  show () {
    this.view.classList.add('modal_active');
    this.events.emit('modalShown', this.view);
  }

  hide () {
    this.view.classList.remove('modal_active')
  }  
  // private addEventListeners() {
  //   if (this.closeButton) {
  //     this.closeButton.addEventListener('click', this.hide);
  //   }

}

// - Также для закрытия модального окна устанавливает следующие слушатели:
//   - слушатель на клавиатуру для закрытия модального окна через Esc;
//   - на клик по оверлею и кнопку крестик.
