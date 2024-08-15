import {EventEmitter} from './base/events';
import {CDN_URL, EventNamesEnum} from '../utils/constants';
import {IProductItem} from '../types'

export class ProductView {
  private listProductEl: HTMLElement;
  private cartProductEl: HTMLElement;
  private previewProductEl: HTMLElement;
  private events: EventEmitter;

  constructor(eventEmmiter: EventEmitter) {
    this.events = eventEmmiter;

    const listProductTemplate = (document.querySelector('#card-catalog') as HTMLTemplateElement).content;
    const cartProductTemplate = (document.querySelector('#card-basket') as HTMLTemplateElement).content;
    const previewProductTemplate = (document.querySelector('#card-preview') as HTMLTemplateElement).content;
    
    this.listProductEl = listProductTemplate.querySelector('.card');
    this.cartProductEl = cartProductTemplate.querySelector('.card');
    this.previewProductEl = previewProductTemplate.querySelector('.card');
  }

  private getCategoryClass(category: string) {
    if (category === 'софт-скил') {
      return 'card__category_soft';
    } else if (category === 'хард-скил') {
      return 'card__category_hard';
    } else if (category === 'дополнительное') {
      return 'card__category_additional';
    } else if (category === 'кнопка') {
      return 'card__category_button';
    } else {
      return 'card__category_other';
    }
  }

  createListElement(product: IProductItem) {
    const productListEl = this.listProductEl.cloneNode(true) as HTMLElement;

    const img = productListEl.querySelector('.card__image') as HTMLImageElement;
    const category = productListEl.querySelector('.card__category');
    const title = productListEl.querySelector('.card__title');
    const price = productListEl.querySelector('.card__price');

    category.classList.add(this.getCategoryClass(product.category))

    img.src = `${CDN_URL}${product.image}`;
    category.textContent = product.category;
    title.textContent = product.title;
    price.textContent = product.price ? `${product.price} синапсов` : 'Бесценно';

    productListEl.addEventListener('click', () => this.events.emit(EventNamesEnum.OPEN_PRODUCT_MODAL, product))

    return productListEl;
  }

  createPreviewElement(product: IProductItem, isInCart: boolean) {
    const productPreviewEl = this.previewProductEl.cloneNode(true) as HTMLElement;
    
    const img = productPreviewEl.querySelector('.card__image') as HTMLImageElement;
    const category = productPreviewEl.querySelector('.card__category')
    const title = productPreviewEl.querySelector('.card__title')
    const description = productPreviewEl.querySelector('.card__text')
    const price = productPreviewEl.querySelector('.card__price')
    const button = productPreviewEl.querySelector('.card__button') as HTMLButtonElement;

    category.classList.add(this.getCategoryClass(product.category))

    img.src = `${CDN_URL}${product.image}`;
    category.textContent = product.category;
    title.textContent = product.title;
    description.textContent = product.description;
    price.textContent = product.price ? `${product.price} синапсов` : 'Бесценно';

    if (!product.price || isInCart) {
      button.disabled = true;
    }

    button.addEventListener('click', () => {
      button.disabled = true;
      this.events.emit(EventNamesEnum.ADD_PRODUCT_IN_CART, product)
    })

    return productPreviewEl;
  }

  createChartElement(product: IProductItem, listNum: number) {
    const productCartEl = this.cartProductEl.cloneNode(true) as HTMLElement;
    
    const title = productCartEl.querySelector('.card__title')
    const price = productCartEl.querySelector('.card__price')
    const button = productCartEl.querySelector('.card__button') as HTMLElement;
    const listNumEl = productCartEl.querySelector('.basket__item-index');
    
    title.textContent = product.title;
    price.textContent = `${product.price} синапсов`;
    listNumEl.textContent = `${listNum}`

    button.addEventListener('click', () => this.events.emit(EventNamesEnum.DELETE_PRODUCT_FROM_CART, {productId: product.id}))

    return productCartEl;
  }
}