import {Api} from "../components/base/api"

//Каталог
export interface IProductList {
  total: number;
  items: IProductItem[];
}

//Товар
export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number
}

//Ошибка
export interface IErrorResponse {
  error: string;
}

//Заказ
export interface IOrder {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: IProductItem['id'][];
}

//Ответ успешного создания заказа
export interface IOrderSuccessResponse {
  id: string;
  total: number;
}

//каталог(класс)
export interface ICatalogModel {
  api: Api;
  products: IProductList;
  setProductList(): Promise<void>;
  getProductList(): IProductList;
}

export interface ICatalogView {
  catalogPlace: HTMLElement;
  catalogElement: HTMLElement;
  renderCatalog(catalog: IProductList): void;
}

//товар(класс)
export interface IProductModel {
  api: Api;
  product: IProductItem;
  setProductItem(): Promise<void>;
  getProductItem(): IProductItem;
}

export interface IProductView {
  productPlace: HTMLElement;
  productElement: HTMLElement;
  renderProduct(product: IProductItem): void;
}

//корзина(класс)
export interface ICartModel {
  items: IProductItem[];
  addProduct(productId: string): void 
  removeProduct(productId: string): void 
  resetCart(): void 
}

export interface ICartView {
  cartPlace: HTMLElement;
  cartElement: HTMLElement;
  renderCart(products: IProductItem[]): void;
}

// Заказ(класс)
export interface IOrderModel {
  api: Api;
  order: IOrder;
  submitOrder(): Promise<void>; //отправка данных на сервер
  updateInfoOrder(order: IOrder): void; // обновление информации в заказе
}

export interface IOrderView {
  orderPlace: HTMLElement;
  orderElement: HTMLElement;
  renderOrder(): void;
  renderOrderStatus(total: IOrder['total']): void;
}