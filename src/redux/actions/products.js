import {ActionType} from 'redux-promise-middleware';
import {actionStrings} from './actionStrings';
import {addProductApi, editProductApi, getProducts} from '../../Utils';

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

const addProductPending = () => ({
  type: actionStrings.addProduct.concat('_', Pending),
});

const addProductRejected = error => ({
  type: actionStrings.addProduct.concat('_', Rejected),
  payload: {error},
});
const addProductFulfilled = data => ({
  type: actionStrings.addProduct.concat('_', Fulfilled),
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
      dispatch(editProductFulfilled(result.data));
    } catch (error) {
      console.log(error);
      msg2()
      dispatch(editProductRejected(error));
    }
  };
};

const addProductThunk = (body, token, msg, msg2) => {
  return async dispatch => {
    try {
      dispatch(addProductPending());
      const result = await addProductApi(body, token);
      console.log(result);
      msg()
      dispatch(addProductFulfilled(result.data));
    } catch (error) {
      console.log(error);
      msg2()
      dispatch(addProductRejected(error));
    }
  };
};

const productsAction = {
  getProductsThunk,
  getProductsThunk2,
  editProductThunk,
  addProductThunk
};

export default productsAction;
