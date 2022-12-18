import {ActionType} from 'redux-promise-middleware';
import {actionStrings} from '../actions/actionStrings';

const initialState = {
  profile: {
    id: null,
    name: null,
    password: null,
    mobile_number: null,
    email: null,
    address: null,
    gender: null,
    birth_date: null,
    role: null,
    firstname: null,
    lastname: null,
    image: null
  },
};

const profileReducer = (prevState = initialState, {payload, type}) => {
  const {Pending, Rejected, Fulfilled} = ActionType;
  const {getProfile, editProfile, profileLogout} = actionStrings;
  switch (type) {
    case getProfile.concat('_', Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getProfile.concat('_', Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.response?.data.message,
      };
    case getProfile.concat('_', Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        profile: payload.data,
      };

    case editProfile.concat('_', Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case editProfile.concat('_', Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        err: payload.error.response?.data.message,
      };
    case editProfile.concat('_', Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
      };
    case profileLogout.concat('_', Fulfilled):
      return initialState;

    default:
      return prevState;
  }
};

export default profileReducer;
