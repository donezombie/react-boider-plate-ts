import { Action } from 'interfaces/redux';
import { takeLatest, put } from 'redux-saga/effects';
import * as types from 'redux/types';

function* login({ payload }: Action) {
  const { username, password } = payload;
  try {
    if (username === 'don' && password === 'don') {
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
