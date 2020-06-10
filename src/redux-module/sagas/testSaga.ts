import { takeLatest, put } from 'redux-saga/effects';

import * as types from 'redux-module/types';
import testServices from 'services/testServices';

function* fetchDataSaga() {
  try {
    const res = yield testServices.getTodos();
    yield put({ type: types.REQUEST_LIST_USER_SUCCESS, payload: res.data });
  } catch (error) {
    yield put({ type: types.REQUEST_LIST_USER_FAILED, error });
    console.log(error);
  }
}

export default function* () {
  yield takeLatest(types.REQUEST_LIST_USER, fetchDataSaga);
}