import {ActionType} from 'redux-promise-middleware';
import {actionStrings} from './actionStrings';
import { getProducts } from '../../Utils';

const {Pending, Rejected, Fulfilled} = ActionType;

const getProductsPending = () => ({
  type: actionStrings.getProducts.concat("_", Pending),
});
const getProductsRejected = (error) => ({
  type: actionStrings.getProducts.concat("_", Rejected),
  payload: { error },
});
const getProductsFulfilled = (data) => ({
  type: actionStrings.getProducts.concat("_", Fulfilled),
  payload: { data },
});


const getProductsThunk = (body, counter) => {
  return async (dispatch) => {
    try {
      dispatch(getProductsPending());
      const result = await getProducts(body, counter);
      console.log(result.data.result);
      dispatch(getProductsFulfilled(result.data));
    } catch (error) {
      console.log(error);
      dispatch(getProductsRejected(error))
      onPress2()
    }
  };
};



const productsAction = {
    getProductsThunk,
};

export default productsAction;