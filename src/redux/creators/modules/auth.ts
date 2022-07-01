import { SagaCreator } from "interfaces/redux";
import ReducerInterface from "interfaces/reducerInterface";
import { put } from "@redux-saga/core/effects";
import produce from "immer";

//! Actions
export const authActions = {
  login: "login",
  loginSuccess: "loginSuccess",
  loginFailed: "loginFailed",
};

//! Sagas
export const authSaga = {
  [authActions.login]: {
    saga: function* ({ payload }) {
      const { username, password } = payload;

      if (username === "don" && password === "don") {
        yield put({ type: authActions.loginSuccess });
      } else {
        yield put({ type: authActions.loginFailed });
      }
    },
  },
} as SagaCreator;

//! Reducers
export const authReducer = (
  state = {
    auth: {
      isLogin: false,
      error: null,
    },
  },
  action: ReducerInterface,
) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case authActions.loginSuccess: {
        draftState.auth.isLogin = true;
        break;
      }

      case authActions.loginFailed: {
        draftState.auth.isLogin = false;
        break;
      }

      default:
        break;
    }
  });
};
