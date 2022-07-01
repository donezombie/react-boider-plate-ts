import { SagaCreator } from "interfaces/redux";
import ReducerInterface from "interfaces/reducerInterface";
import { put } from "@redux-saga/core/effects";
import { call } from "typed-redux-saga";
import produce from "immer";
import todoServices from "services/todosServices";

//! Actions
export const todoActions = {
  getTodos: "getTodos",
  getTodosSuccess: "getTodosSuccess",
  getTodoFailed: "getTodoFailed",
};

//! Sagas
export const todoSagas = {
  [todoActions.getTodos]: {
    saga: function* ({ payload }) {
      const callbacks = payload?.callbacks;

      try {
        const response = yield* call(todoServices.getTodos);
        callbacks?.onSuccess && callbacks.onSuccess(response);
        yield put({
          type: todoActions.getTodosSuccess,
          payload: { todos: response.data },
        });
      } catch (error) {
        callbacks?.onFailed && callbacks.onFailed(error);
        yield put({ type: todoActions.getTodoFailed, error });
      }
    },
  },
} as SagaCreator;

//! Reducers
export const todoReducer = (
  state = {
    todos: {
      data: [],
      loading: false,
      error: null,
    },
  },
  action: ReducerInterface
) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case todoActions.getTodos: {
        draftState.todos.loading = true;
        break;
      }

      case todoActions.getTodosSuccess: {
        draftState.todos.loading = false;
        draftState.todos.data = action.payload.todos;
        draftState.todos.error = null;
        break;
      }

      case todoActions.getTodoFailed: {
        draftState.todos.loading = false;
        draftState.todos.error = action.error;
        break;
      }

      default:
        break;
    }
  });
};
