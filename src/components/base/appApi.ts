import {IApi, IProductItem, ApiListResponse, ApiOrderResponse, ApiOrderRequest} from '../../types';

export class AppApi {
  private _baseApi: IApi

  constructor(baseApi: IApi) {
    this._baseApi = baseApi;
  }

  getProducts() {
    return this._baseApi.get<ApiListResponse<IProductItem>>('/product').then(({items}) => items);
  }

  getProduct(productId: string) {
    return this._baseApi.get<IProductItem>(`/product/${productId}`).then((product) => product);
  }

  postOrder(order: ApiOrderRequest) {
    return this._baseApi.post<ApiOrderResponse>('/order', order, 'POST').then(({total}) => total);
  }
}