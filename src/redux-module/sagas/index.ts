import { fork, all } from 'redux-saga/effects';
import testSaga from './testSaga';
import authSaga from './authSaga';

export default function* rootSaga() {
  yield all([
      fork(testSaga),
      fork(authSaga)
  ]);
}