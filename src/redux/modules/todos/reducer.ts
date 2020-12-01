import ReducerInterface from 'interfaces/reducerInterface';
import produce from 'immer';
import * as types from 'redux/types';

const initialState = {
  todos: {
    data: [],
    loading: false,
    error: null,
  },
};

export const todosReducer = (state = initialState, action: ReducerInterface) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case types.REQUEST_LIST_TODOS:
        draftState.todos.loading = true;
        break;

      case types.REQUEST_LIST_TODOS_SUCCESS:
        draftState.todos.loading = false;
        draftState.todos.data = action.payload;
        break;

      case types.REQUEST_LIST_TODOS_FAILED:
        draftState.todos.loading = false;
        draftState.todos.error = action.error;
        break;

      default:
        break;
    }
  });
};
