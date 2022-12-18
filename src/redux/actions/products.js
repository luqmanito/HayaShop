import {ActionType} from 'redux-promise-middleware';
import {actionStrings} from './actionStrings';
import {editProductApi, getProducts} from '../../Utils';

const {Pending, Rejected, Fulfilled} = ActionType;

const getProductsPending = () => ({
  type: actionStrings.getProducts.concat('_', Pending),
});
const getProductsRejected = error => ({
  type: actionStrings.getProducts.concat('_', Rejected),
  payload: {error},
});
const getProductsFulfilled = data => ({
  type: actionStrings.getProducts.concat('_', Fulfilled),
  payload: {data},
});

const editProductPending = () => ({
  type: actionStrings.editProduct.concat('_', Pending),
});

const editProductRejected = error => ({
  type: actionStrings.editProduct.concat('_', Rejected),
  payload: {error},
});
const editProductFulfilled = data => ({
  type: actionStrings.editProduct.concat('_', Fulfilled),
  payload: {data},
});

const getProductsThunk = (body, counter, add) => {
  return async dispatch => {
    try {
      dispatch(getProductsPending());
      const result = await getProducts(body, counter);
      dispatch(getProductsFulfilled(result.data));
      add();
    } catch (error) {
      console.log(error);
      dispatch(getProductsRejected(error));
    }
  };
};

const getProductsThunk2 = (body, counter, add) => {
  return async dispatch => {
    try {
      dispatch(getProductsPending());
      const result = await getProducts(body, counter);
      dispatch(getProductsFulfilled(result.data));
      add();
    } catch (error) {
      console.log(error);
      dispatch(getProductsRejected(error));
    }
  };
};

const editProductThunk = (body, id, token, msg, msg2) => {
  return async dispatch => {
    try {
      dispatch(editProductPending());
      const result = await editProductApi(body, id, token);
      console.log(result);
      msg()
      dispatch(editProductRejected(result.data));
    } catch (error) {
      console.log(error);
      msg2()
      dispatch(editProductFulfilled(error));
    }
  };
};

const productsAction = {
  getProductsThunk,
  getProductsThunk2,
  editProductThunk,
};

export default productsAction;
