import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth";
import cartReducer from "./cart";
import checkoutReducer from "./checkout";
import paymentReducer from "./payment";
import productsDetailsReducer from "./productDetail";
import productsReducer from "./products";
import profileReducer from "./profile";
import transactionReducer from "./transaction";

export default combineReducers({
  auth: authReducer,
  products: productsReducer,
  productDetail:productsDetailsReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  profile: profileReducer,
  payment: paymentReducer,
  transaction: transactionReducer
});
