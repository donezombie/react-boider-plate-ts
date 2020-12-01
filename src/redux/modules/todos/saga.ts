import { Action } from 'redux';
import { takeLatest, put } from 'redux-saga/effects';
import { onSagaSuccess } from 'redux/reduxHelpers';
import * as types from 'redux/types';
import TodosServices from 'services/todosServices';
import { getTodosListSuccess } from './actions';

function* getTodosListSaga(action: Action) {
  try {
    const response = yield TodosServices.getTodos();
    onSagaSuccess(action, response, yield put(getTodosListSuccess(response.data)));
  } catch (error) {
    yield put({ type: types.REQUEST_LIST_TODOS_FAILED, error });
  }
}

export function* todosSaga() {
  yield takeLatest(types.REQUEST_LIST_TODOS, getTodosListSaga);
}
