import {ActionType} from 'redux-promise-middleware';
import {actionStrings} from '../actions/actionStrings';

const initialState = {
  checkoutItemList: []
};

const checkoutReducer = (prevState = initialState, {payload, type}) => {
    const { checkoutItem } = actionStrings;
  switch (type) {
      case checkoutItem:
      return {
        ...prevState,
        checkoutItemList: payload.body
      };

    default:
      return prevState;
  }
};

export default checkoutReducer;

