import {ActionType} from 'redux-promise-middleware';
import {actionStrings} from './actionStrings';
import { loginApi } from '../../Utils';

const {Pending, Rejected, Fulfilled} = ActionType;

const loginPending = () => ({
  type: actionStrings.authLogin.concat("_", Pending),
});
const loginRejected = (error) => ({
  type: actionStrings.authLogin.concat("_", Rejected),
  payload: { error },
});
const loginFulfilled = (data) => ({
  type: actionStrings.authLogin.concat("_", Fulfilled),
  payload: { data },
});

const loginThunk = (body, onPress, onPress2) => {
  return async (dispatch) => {
    try {
      dispatch(loginPending());
      const result = await loginApi(body);
      console.log(result);
      onPress()
      dispatch(loginFulfilled(result.data));
    } catch (error) {
      console.log(error);
      dispatch(loginRejected(error))
      onPress2()
    }
  };
};

const authAction = {
  loginThunk,
};

export default authAction;