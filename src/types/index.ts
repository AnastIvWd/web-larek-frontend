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
  total: number;
  items: IProductItem[];
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
}

export type TProductInfo = Pick<IProductItem, 'category' | 'title' | 'description' | 'price'>;
export type TCartInfo = Pick<IOrder, 'items' | 'total'>;
export type TPaymentInfo = Pick<IOrder, 'payment' | 'address'>;
export type TOrderContacts = Pick<IOrder, 'email' | 'phone'>;
export type TSuccess = Pick<IOrder, 'total'>;
type TValidation = TPaymentInfo & TOrderContacts;