import { ReduxCallbacks } from 'interfaces/redux';
import * as types from 'redux/types';

// get todos list
export const getTodosList = (callbacks: ReduxCallbacks) => ({
  type: types.REQUEST_LIST_TODOS,
  payload: { callbacks },
});

export const getTodosListSuccess = (payload: any) => ({
  type: types.REQUEST_LIST_TODOS_SUCCESS,
  payload,
});

export const getTodosListFailed = (payload: any) => ({
  type: types.REQUEST_LIST_TODOS_FAILED,
  payload,
});
