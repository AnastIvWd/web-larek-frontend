//Товар
export interface IProductItem {
  id: string;
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
  getCartItem(productId: string): IProductItem;
  checkValidation(data: TValidation):boolean;
  setPaymentInfo(paymentInfo: TPaymentInfo):void;
  setOrderContacts(contacts: TOrderContacts):void;
  resetCart():void;
  getItemsTotal(): number;
  getOrderData(): ApiOrderRequest;
}

export type TProductInfo = Pick<IProductItem, 'category' | 'title' | 'description' | 'price'>;
export type TPaymentInfo = Pick<IOrder, 'payment' | 'address'>;
export type TOrderContacts = Pick<IOrder, 'email' | 'phone'>;
export type TValidation = TPaymentInfo | TOrderContacts;

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type ApiListResponse<Type> = {
  total: number,
  items: Type[]
};

export type ApiOrderRequest = IOrder & {
  total: number,
  items: string[]
}

export type ApiOrderResponse = {
  total: number,
  id: string
};

export interface IApi {
  baseUrl: string;
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: object, method?: ApiPostMethods): Promise<T>;
}