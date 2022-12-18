import {ActionType} from 'redux-promise-middleware';
import {actionStrings} from './actionStrings';
import { editprofilesApi, getProfile } from '../../Utils';

const {Pending, Rejected, Fulfilled} = ActionType;

const getProfilePending = () => ({
  type: actionStrings.getProfile.concat("_", Pending),
});
const getProfileRejected = (error) => ({
  type: actionStrings.getProfile.concat("_", Rejected),
  payload: { error },
});
const getProfileFulfilled = (data) => ({
  type: actionStrings.getProfile.concat("_", Fulfilled),
  payload: { data },
});

const editProfilePending = () => ({
  type: actionStrings.editProfile.concat("_", Pending),
});

const editProfileRejected = (error) => ({
  type: actionStrings.editProfile.concat("_", Rejected),
  payload: { error },
});
const editProfileFulfilled = (data) => ({
  type: actionStrings.editProfile.concat("_", Fulfilled),
  payload: { data },
});

const getProfileThunk = (body, token) => {
  return async (dispatch) => {
    try {
      dispatch(getProfilePending());
      const result = await getProfile(body, token);
      // console.log(result.data.result);
      dispatch(getProfileFulfilled(result.data));
    } catch (error) {
      console.log(error);
      dispatch(getProfileRejected(error))
    }
  };
};

const editProfileThunk = (body, token, id, msg, msg2) => {
  return async (dispatch) => {
    try {
      dispatch(editProfilePending());
      const result = await editprofilesApi(body, token, id);
      msg()
      // console.log(result);
      dispatch(editProfileFulfilled(result.data));
    } catch (error) {
      msg2()
      console.log(error);
      dispatch(editProfileRejected(error));
    }
  };
};



const profileAction = {
    getProfileThunk,
    editProfileThunk
};

export default profileAction;