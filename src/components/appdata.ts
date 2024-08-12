import { IProductItem, IOrder, IAppData, TValidation, TOrderContacts, TPaymentInfo} from "../types";
import { IEvents } from "./base/events";

export class AppData implements IAppData {
  private _products: IProductItem[];
  private _preview: string | null;
  private _cart: IProductItem[];
  private _order: IOrder;
  error: string | null;
  events: IEvents;

  // constructor () {}
  
  constructor (events: IEvents) {
    this.events = events;
  }

  get products () {
    return this._products
  }

  get preview () {
    return this._preview
  } 

  get cart () {
    return this._cart
  } 

  get order () {
    return this._order
  } 

  addProductInCart(product: IProductItem) {
    this._cart.push(product);
    this.events.emit(`CHANGED_PRODUCT_ITEMS`, this._cart)
  };

  deleteProductFromCart(productId: string){
    this._cart = this._cart.filter(item => item._id !== productId);
    this.events.emit(`CHANGED_PRODUCT_ITEMS`, this._cart);
  };

  getProductItem(productId: string): IProductItem {
    return this._products.find(item => item._id === productId);
  };

  checkValidation(data: Record<keyof TValidation, string>): boolean {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const typedKey = key as keyof TValidation; 
        if (data[typedKey].trim() === '') {
          return false;
        }
      }
    }
    return true;
  };

  setPaymentInfo(paymentInfo: TPaymentInfo) {
    this._order.payment = paymentInfo.payment;
    this._order.address = paymentInfo.address;
    this.events.emit(`INPUT_FORM_PAYMENT`, this._order);
  };

  setOrderContacts(contacts: TOrderContacts) {
    this._order.email = contacts.email;
    this._order.phone = contacts.phone;
    this.events.emit(`INPUT_FORM_PAYMENT`, this._order);
  };

  resetCart() {
    this._cart = [];
    this.events.emit(`RESET_CART`, this._cart);
  };

  getItemsTotal() {
    return this._cart.reduce( (acc, curr) => acc + curr.price ,0)
  }
}