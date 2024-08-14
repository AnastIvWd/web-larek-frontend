export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  headers: {
    authorization: `${process.env.API_TOKEN}`,
    'Content-Type': `application/json`,
  },
};

export enum EventNamesEnum {
  OPEN_PRODUCT_MODAL = 'OPEN_PRODUCT_MODAL',
  ADD_PRODUCT_IN_CART = 'ADD_PRODUCT_IN_CART',
  OPEN_CART = 'OPEN_CART',
  DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART',
  SUBMIT_CART = 'SUBMIT_CART',
  SUBMIT_FORM_ORDER = 'SUBMIT_FORM_ORDER',
  VALIDATIOM_FORM_ORDER = 'VALIDATIOM_FORM_ORDER',
  SUBMIT_FORM_CONTACTS = 'SUBMIT_FORM_CONTACTS',
  VALIDATIOM_FORM_CONTACTS = 'VALIDATIOM_FORM_CONTACTS',
  RESET_CART = 'RESET_CART',
  CLOSE_MODAL = 'CLOSE_MODAL'
}