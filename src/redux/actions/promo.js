import {ActionType} from 'redux-promise-middleware';
import {actionStrings} from './actionStrings';
import {addPromoApi, } from '../../Utils';

const {Pending, Rejected, Fulfilled} = ActionType;

const addPromoPending = () => ({
  type: actionStrings.addPromo.concat('_', Pending),
});

const addPromoRejected = error => ({
  type: actionStrings.addPromo.concat('_', Rejected),
  payload: {error},
});
const addPromoFulfilled = data => ({
  type: actionStrings.addPromo.concat('_', Fulfilled),
  payload: {data},
});

const addPromoThunk = (body, token, msg, msg2) => {
  return async dispatch => {
    try {
      dispatch(addPromoPending());
      const result = await addPromoApi(body, token);
      console.log(result);
      msg()
      dispatch(addPromoFulfilled(result.data));
    } catch (error) {
      console.log(error);
      msg2()
      dispatch(addPromoRejected(error));
    }
  };
};

const promoAction = {
  addPromoThunk
};

export default promoAction;
