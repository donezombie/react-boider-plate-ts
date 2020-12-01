import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import { authSaga, authReducer } from './modules/auth';
import { todosReducer, todosSaga } from './modules/todos';

export function* rootSagas() {
  yield all([fork(authSaga), fork(todosSaga)]);
}

export const rootReducers = combineReducers({
  authReducer,
  todosReducer,
});
