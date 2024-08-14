import {IAppData, IProductItem, IOrder, TPaymentInfo, TOrderContacts, TValidation, ApiOrderRequest} from '../../types'
import {IEvents} from './events';

export class AppData implements IAppData {
  private _products: IProductItem[] = [];
  private _preview: string | null = null;
  private _cart: IProductItem[] = [];
  private _order: IOrder = {} as IOrder;
  error: string | null;
  events: IEvents;

  get products() {
    return this._products;
  }
  get preview() {
    return this._preview
  }
  get cart() {
    return this._cart
  }
  get order() {
    return this._order
  }

  addProductInCart(product: IProductItem) {
    const productItem = this._cart.find(({id}) => id === product.id);

    if (!productItem) {
      this._cart.push(product);
    }
  };

  deleteProductFromCart(productId: string) {
    this._cart = this._cart.filter(({id}) => id !== productId);
  };

  getCartItem(productId: string) {
    return this._cart.find(({id}) => id === productId);
  };

  checkValidation(data: TValidation) {
    return Object.values(data).every(val => val.trim() !== '')
  };

  setPaymentInfo(paymentInfo: TPaymentInfo) {
    this._order.payment = paymentInfo.payment;
    this._order.address = paymentInfo.address;
  };

  setOrderContacts(contacts: TOrderContacts) {
    this._order.email = contacts.email;
    this._order.phone = contacts.phone;
  };

  setProducts(newProducts: IProductItem[]) {
    this._products = newProducts
  }

  resetCart() {
    this._cart = [];
  };

  getItemsTotal() {
    return this._cart.reduce((acc, curr) => acc + curr.price, 0);
  };

  getOrderData() {
    return {
      ...this._order,
      total: this.getItemsTotal(),
      items: this._cart.map(({id}) => id)
    } as ApiOrderRequest;
  }
}