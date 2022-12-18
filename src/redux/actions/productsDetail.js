// import {ActionType} from 'redux-promise-middleware';
// import {actionStrings} from './actionStrings';
// import { getProductById } from '../../Utils';


// const {Pending, Rejected, Fulfilled} = ActionType;


// const productDetailPending = () => ({
//   type: actionStrings.productDetail.concat("-", Pending),
// });

// const productDetailRejected = (error) => ({
//   type: actionStrings.productDetail.concat("-", Rejected),
//   payload: { error },
// });

// const productDetailFulfilled = (data) => ({
//   type: actionStrings.productDetail.concat("-", Fulfilled),
//   payload: { data },
// });


// // const getProductsDetailThunk = (id) => {
// //   return async (dispatch) => {
// //     try {
// //       dispatch(productDetailPending());
// //       const result = await getProductById(id);
// //       console.log(result);
// //       dispatch(productDetailFulfilled(result));
// //     } catch (error) {
// //       console.log(error);
// //       dispatch(productDetailRejected(error))
// //     }
// //   };
// // };

// const productsDetailAction = {
//   productDetailPending,
//   productDetailRejected,
//   productDetailFulfilled
// };

// export default productsDetailAction;

import {ActionType} from 'redux-promise-middleware';
import {actionStrings} from './actionStrings';
import { getProductById } from '../../Utils';

const {Pending, Rejected, Fulfilled} = ActionType;

const getProductsDetailPending = () => ({
  type: actionStrings.productDetail.concat("_", Pending),
});
const getProductsDetailRejected = (error) => ({
  type: actionStrings.productDetail.concat("_", Rejected),
  payload: { error },
});
const getProductsDetailFulfilled = (data) => ({
  type: actionStrings.productDetail.concat("_", Fulfilled),
  payload: { data },
});


const getProductsDetailThunk = (body ) => {
  return async (dispatch) => {
    try {
      dispatch(getProductsDetailPending());
      const result = await getProductById(body);
      console.log(result.data.result);
      dispatch(getProductsDetailFulfilled(result.data));
    } catch (error) {
      console.log(error);
      dispatch(getProductsDetailRejected(error))
    }
  };
};



const productsDetailAction = {
  getProductsDetailThunk,
};

export default productsDetailAction;