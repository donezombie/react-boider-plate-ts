import { combineReducers as combineReducersRedux } from 'redux';

import { authSaga, authReducer } from './auth';

const combineSaga = {
  ...authSaga,
};

const combineReducers = combineReducersRedux({
  authReducer,
});

export { combineSaga, combineReducers };
