import {ActionType} from 'redux-promise-middleware';
import {actionStrings} from '../actions/actionStrings';

const initialState = {
  userData: {token: null, role: null, id: null, name: null},
  isLoading: false,
  isError: false,
  isFulfilled: false,
  err: null,
  confirms: false,
};

const authReducer = (prevState = initialState, {payload, type}) => {
  const {Pending, Rejected, Fulfilled} = ActionType;
  const {authLogin} = actionStrings;
  switch (type) {
    case authLogin.concat('_', Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case authLogin.concat('_', Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.response?.data.message,
      };
    case authLogin.concat('_', Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        userData: {
          token: payload.data.data.token,
          role: payload.data.data.role,
          name: payload.data.data.name,
          id: payload.data.data.id,
        },
      };

    default:
      return prevState;
  }
};

export default authReducer;
