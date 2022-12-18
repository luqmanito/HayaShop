import {ActionType} from 'redux-promise-middleware';
import {actionStrings} from './actionStrings';
import {loginApi, logoutApi} from '../../Utils';
import profileAction from './profile';

const {Pending, Rejected, Fulfilled} = ActionType;

const loginPending = () => ({
  type: actionStrings.authLogin.concat('_', Pending),
});
const loginRejected = error => ({
  type: actionStrings.authLogin.concat('_', Rejected),
  payload: {error},
});
const loginFulfilled = data => ({
  type: actionStrings.authLogin.concat('_', Fulfilled),
  payload: {data},
});

const logoutPending = () => ({
  type: actionStrings.authLogout.concat('_', Pending),
});
const logoutRejected = error => ({
  type: actionStrings.authLogout.concat('_', Rejected),
  payload: {error},
});
const logoutFulfilled = data => ({
  type: actionStrings.authLogout.concat('_', Fulfilled),
  payload: {data},
});
const logoutFulfilled2 = data => ({
  type: actionStrings.profileLogout.concat('_', Fulfilled),
  payload: {data},
});

const loginThunk = (body, onPress, onPress2, storeData, onPressAdmin) => {
  return async dispatch => {
    try {
      dispatch(loginPending());
      const result = await loginApi(body);
      // console.log(result.data.data.token);
      dispatch(loginFulfilled(result.data));
      dispatch(
        profileAction.getProfileThunk(
          result.data.data.id,
          result.data.data.token,
        ),
      );
      storeData(result.data.data.token);
      result.data.data.role === 'user' ? onPressAdmin() : onPress()   
    } catch (error) {
      console.log(error);
      dispatch(loginRejected(error));
      onPress2();
    }
  };
};

const logoutThunk = (token, logOutMsg) => {
  return async dispatch => {
    try {
      dispatch(logoutPending());
      const result = await logoutApi(token);
      dispatch(logoutFulfilled(result.data));
      // dispatch(logoutFulfilled2(result.data));
      logOutMsg()
    } catch (error) {
      dispatch(logoutRejected(error));
    }
  };
};

const authAction = {
  loginThunk,
  logoutThunk,
};

export default authAction;
