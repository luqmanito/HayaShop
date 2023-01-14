import {ActionType} from 'redux-promise-middleware';
import {actionStrings} from '../actions/actionStrings';

const initialState = {
  cart: []
};

const cartReducer = (prevState = initialState, {payload, type}) => {
    const { cartSubsctract } = actionStrings;
  switch (type) {
      case cartSubsctract:
      return {
        ...prevState,
        cart : payload.body
      };

    default:
      return prevState;
  }
};

export default cartReducer;


// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     cart: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const itemInCart = state.cart.find((item) => item.id === action.payload.id);
//       if (itemInCart) {
//         itemInCart.quantity++;
//       } else {
//         state.cart.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     incrementQuantity: (state, action) => {
//       const item = state.cart.find((item) => item.id === action.payload);
//       item.quantity++;
//     },
//     decrementQuantity: (state, action) => {
//       const item = state.cart.find((item) => item.id === action.payload);
//       if (item.quantity === 1) {
//         item.quantity = 1
//       } else {
//         item.quantity--;
//       }
//     },
//     removeItem: (state, action) => {
//       const removeItem = state.cart.filter((item) => item.id !== action.payload);
//       state.cart = removeItem;
//     },
//   },
// });