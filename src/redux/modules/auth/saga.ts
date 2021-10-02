import { ResponseGenerator } from 'interfaces';
import { Action } from 'interfaces/redux';
import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from 'redux/types';
import todosServices from 'services/todosServices';

function* login({ payload }: Action) {
  const { username, password } = payload;
  try {
    if (username === 'don' && password === 'don') {
      const response: ResponseGenerator = yield call(todosServices.getTodos);
      //* Example call api in saga
      console.log(response);
      yield put({ type: types.REQUEST_LOGIN_SUCCESS });
    } else {
      yield put({ type: types.REQUEST_LOGIN_FAILED });
    }
  } catch (error) {
    yield put({ type: types.REQUEST_LOGIN_FAILED, error });
  }
}

export function* authSaga() {
  yield takeLatest(types.REQUEST_LOGIN, login);
}
