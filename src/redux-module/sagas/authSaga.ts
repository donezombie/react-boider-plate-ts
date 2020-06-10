import { takeLatest, put } from 'redux-saga/effects';

import * as types from 'redux-module/types';

function* login({ payload }: any) {
  const { username, password } = payload;
  try {
    if (username === 'don' && password === 'don') {
      yield put({ type: types.REQUEST_LOGIN_SUCCESS });
    } else {
      yield put({ type: types.REQUEST_LOGIN_FAILED });  
    }
  } catch (error) {
    yield put({ type: types.REQUEST_LOGIN_FAILED, error });
    console.log(error);
  }
}

export default function* () {
  yield takeLatest(types.REQUEST_LOGIN, login);
}