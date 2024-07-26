export const API_URL = `${process.env.API_ORIGIN}/cohort16`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  headers: {
    authorization: `${process.env.API_TOKEN}`,
    'Content-Type': `application/json`,
  },
};

export enum EventNamesEnum {
  OPEN_PRODUCT_MODAL = "OPEN_PRODUCT_MODAL", 
  CLOSE_PRODUCT_MODAL = "CLOSE_PRODUCT_MODAL",
  ADD_PRODUCT_IN_CART = "ADD_PRODUCT_IN_CART",
  DELETE_PRODUCT_FROM_CART = "DELETE_PRODUCT_FROM_CART",
  RESET_CART = "RESET_CART",
  OPEN_CART = "OPEN_CART",
  CLOSE_CART = "CLOSE_CART",
  SUBMIT_CART = "SUBMIT_CART",
  CLICK_NEXT = "CLICK_NEXT",
  SUBMIT_ORDER = "SUBMIT_ORDER",
  CLOSE_ORDER = "CLOSE_ORDER"
}