import { takeLatest, put } from 'redux-saga/effects';
import * as types from 'redux/types';
import TodosServices from 'services/todosServices';

function* getTodosListSaga() {
  try {
    const response = yield TodosServices.getTodos();
    yield put({ type: types.REQUEST_LIST_TODOS_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: types.REQUEST_LIST_TODOS_FAILED, error });
  }
}

export function* todosSaga() {
  yield takeLatest(types.REQUEST_LIST_TODOS, getTodosListSaga);
}