//Товар
export interface IProductItem {
  _id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

//Заказ
export interface IOrder {
  payment: string;
  email: string;
  phone: string;
  address: string;
}

export interface IAppData {
  products: IProductItem[];
  preview: string | null; 
  cart: IProductItem[];
  order: IOrder;
  error: string | null;
  addProductInCart(product: IProductItem): void;
  deleteProductFromCart(productId: string): void;
  getProductItem(productId: string): IProductItem;
  checkValidation(data: Record<keyof TValidation, string>):boolean;
  setPaymentInfo(paymentInfo: TPaymentInfo):void;
  setOrderContacts(contacts: TOrderContacts):void;
  resetCart():void;
  getItemsTotal(): number;
}

export type TProductInfo = Pick<IProductItem, 'category' | 'title' | 'description' | 'price'>;
export type TPaymentInfo = Pick<IOrder, 'payment' | 'address'>;
export type TOrderContacts = Pick<IOrder, 'email' | 'phone'>;
export type TValidation = TPaymentInfo & TOrderContacts;