import './scss/styles.scss';

import {Api} from './components/base/api';
import {AppData} from './components/base/appData';
import {EventEmitter} from './components/base/events'
import {ModalView} from './components/base/modalView';
import {AppApi} from './components/base/appApi';
import {UserCart} from './components/userCart';
import {Cart} from './components/cart';
import {ProductView} from './components/product';
import {ProductContainer} from './components/productContainer';
import {OrderForm} from './components/orderForm';
import {Confirm} from './components/confirm';
import {API_URL, EventNamesEnum, settings} from './utils/constants'
import {IProductItem, TOrderContacts, TPaymentInfo} from './types';
import {ContactsForm} from './components/contactsForm';

const api = new AppApi(new Api(API_URL, settings));
const appData = new AppData();
const eventEmmiter = new EventEmitter();
const modal = new ModalView(eventEmmiter);
const userCart = new UserCart(eventEmmiter);
const cart = new Cart(eventEmmiter);
const productView = new ProductView(eventEmmiter);
const productContainer = new ProductContainer();
const orderForm = new OrderForm(eventEmmiter, '#order')
const contactsForm = new ContactsForm(eventEmmiter, '#contacts')
const confirm = new Confirm(eventEmmiter);

api.getProducts().then(products => {
  appData.setProducts(products)

  for (let i = 0; i < appData.products.length; i++) {
    const catalogEl = productView.createListElement(appData.products[i]);
    productContainer.addProduct(catalogEl);
  }
});

eventEmmiter.on(EventNamesEnum.OPEN_PRODUCT_MODAL, (product: IProductItem) => {
  const item = appData.getCartItem(product.id);
  const previewEl = productView.createPreviewElement(product, Boolean(item))
  modal.setModalContent(previewEl)
  modal.show();
})

eventEmmiter.on(EventNamesEnum.CLOSE_MODAL, () => {
  modal.hide();
})

eventEmmiter.on(EventNamesEnum.ADD_PRODUCT_IN_CART, (product: IProductItem) => {
  appData.addProductInCart(product);
  userCart.setUserCart(appData.cart.length);
})

eventEmmiter.on(EventNamesEnum.DELETE_PRODUCT_FROM_CART, ({productId}: {productId: string}) => {
  appData.deleteProductFromCart(productId);
  let cartTotal = 0;
  
  const cartItems = appData.cart.map((item, idx) => {
    cartTotal += item.price;
    return productView.createChartElement(item, idx + 1)
  });

  cart.setCartContent(cartItems);
  cart.setCartTotal(cartTotal);
  cart.setCanCreateOrder(!cartTotal);
  userCart.setUserCart(appData.cart.length)
})

eventEmmiter.on(EventNamesEnum.OPEN_CART, () => {
  let cartTotal = 0;
  const cartItems = appData.cart.map((item, idx) => {
    cartTotal += item.price;
    return productView.createChartElement(item, idx + 1)
  });

  cart.setCartContent(cartItems);
  cart.setCartTotal(cartTotal);
  cart.setCanCreateOrder(!cartTotal);
  modal.setModalContent(cart.view);
  modal.show();
})

eventEmmiter.on(EventNamesEnum.SUBMIT_CART, () => {
  modal.setModalContent(orderForm.view);
})

eventEmmiter.on(EventNamesEnum.VALIDATIOM_FORM_ORDER, (formValues: TPaymentInfo) => {
  const isValid = appData.checkValidation(formValues);
  orderForm.setCanSubmit(isValid);
})

eventEmmiter.on(EventNamesEnum.SUBMIT_FORM_ORDER, (formValues: TPaymentInfo) => {
  appData.setPaymentInfo(formValues);
  orderForm.resetForm();
  modal.setModalContent(contactsForm.view);
})

eventEmmiter.on(EventNamesEnum.VALIDATIOM_FORM_CONTACTS, (formValues: TOrderContacts) => {
  const isValid = appData.checkValidation(formValues);
  contactsForm.setCanSubmit(isValid);
})

eventEmmiter.on(EventNamesEnum.SUBMIT_FORM_CONTACTS, (formValues: TOrderContacts) => {
  appData.setOrderContacts(formValues);
  const order = appData.getOrderData();

  api.postOrder(order).then(total => {
    contactsForm.resetForm();
    appData.resetCart();
    cart.setCartContent([])
    confirm.setTotal(total);
    userCart.setUserCart(0)
    modal.setModalContent(confirm.view);
  })
})