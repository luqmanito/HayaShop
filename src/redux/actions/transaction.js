import {ActionType} from 'redux-promise-middleware';
import {actionStrings} from './actionStrings';
import {
  addPromoApi,
  addTransactionApi,
  deleteHistoryApi,
  editTransactionApi,
  getAllTransactionApi,
  getHistoryTransactionApi,
} from '../../Utils';

const {Pending, Rejected, Fulfilled} = ActionType;

const addTransactionPending = () => ({
  type: actionStrings.addTransaction.concat('_', Pending),
});

const addTransactionRejected = error => ({
  type: actionStrings.addTransaction.concat('_', Rejected),
  payload: {error},
});
const addTransactionFulfilled = data => ({
  type: actionStrings.addTransaction.concat('_', Fulfilled),
  payload: {data},
});

const addTransactionThunk = (body, token, msg2, showNotifHandle) => {
  return async dispatch => {
    try {
      dispatch(addTransactionPending());
      const result = await addTransactionApi(body, token);
      dispatch(addTransactionFulfilled(result.data));
      showNotifHandle()
      // console.log(result.data);
    } catch (error) {
      console.log(error);
      msg2();
      dispatch(addTransactionRejected(error));
    }
  };
};

const getHistoryPending = () => ({
  type: actionStrings.getHistoryTransaction.concat('_', Pending),
});

const getHistoryRejected = error => ({
  type: actionStrings.getHistoryTransaction.concat('_', Rejected),
  payload: {error},
});
const getHistoryFulfilled = data => ({
  type: actionStrings.getHistoryTransaction.concat('_', Fulfilled),
  payload: {data},
});

const delHistoryPending = () => ({
  type: actionStrings.deleteHistory.concat('_', Pending),
});

const delHistoryRejected = error => ({
  type: actionStrings.deleteHistory.concat('_', Rejected),
  payload: {error},
});
const delHistoryFulfilled = data => ({
  type: actionStrings.deleteHistory.concat('_', Fulfilled),
  payload: {data},
});

const getHistoryTransactionThunk = (token) => {
  return async dispatch => {
    try {
      dispatch(getHistoryPending());
      const result = await getHistoryTransactionApi(token);
      console.log(result);
      dispatch(getHistoryFulfilled(result.data.result));
    } catch (error) {
      console.log(error);
      dispatch(getHistoryRejected(error));
    }
  };
};

const getAllHistoryTransactionThunk = (token) => {
  return async dispatch => {
    try {
      dispatch(getHistoryPending());
      const result = await getAllTransactionApi(token);
      console.log(result);
      dispatch(getHistoryFulfilled(result.data.result));
    } catch (error) {
      console.log(error);
      dispatch(getHistoryRejected(error));
    }
  };
};

const editAllHistoryTransactionThunk = (body, id, change) => {
  return async dispatch => {
    try {
      dispatch(getHistoryPending());
      const result = await editTransactionApi(body, id);
      console.log(result);
      dispatch(getHistoryFulfilled(result.data.result));
      change()
    } catch (error) {
      console.log(error);
      dispatch(getHistoryRejected(error));
    }
  };
};

const deleteHistoryTransactionThunk = (id, token, ) => {
  return async dispatch => {
    try {
      // dispatch(delHistoryPending());
      console.log(id);
      const result = await deleteHistoryApi(id, token);
      // dispatch(delHistoryFulfilled(result.data));
      console.log(result);
      
    } catch (error) {
      // dispatch(delHistoryRejected(error));
      console.log(error);
    }
  };
};


const transactionAction = {
  addTransactionThunk,
  getHistoryTransactionThunk,
  deleteHistoryTransactionThunk,
  getAllHistoryTransactionThunk,
  editAllHistoryTransactionThunk
};

export default transactionAction;


