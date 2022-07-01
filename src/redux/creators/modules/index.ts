import { combineReducers as combineReducersRedux } from "redux";

import { authSaga, authReducer } from "./auth";
import { todoSagas, todoReducer } from "./todos";

const combineSaga = {
  ...authSaga,
  ...todoSagas,
};

const combineReducers = combineReducersRedux({
  authReducer,
  todoReducer,
});

export { combineSaga, combineReducers };
