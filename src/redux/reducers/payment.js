import {ActionType} from 'redux-promise-middleware';
import {actionStrings} from '../actions/actionStrings';

const initialState = {
  paymentList: []
};

const paymentReducer = (prevState = initialState, {payload, type}) => {
    const { addPayment } = actionStrings;
  switch (type) {
      case addPayment:
      return {
        ...prevState,
        paymentList: payload.body
      };

    default:
      return prevState;
  }
};

export default paymentReducer;

