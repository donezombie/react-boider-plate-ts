import * as types from 'redux-module/types';
import ReducerInterface from 'interfaces/reducerInterface';

const initialState = {
  todos: [],
  isFetching: false,
  errorTodos: null,
}

export default (state = initialState, actions: ReducerInterface) => {
  switch (actions.type) {
    case types.REQUEST_LIST_USER:
      return {
        ...state,
        isFetching: true
      };

    case types.REQUEST_LIST_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        todos: actions.payload
      };

    case types.REQUEST_LIST_USER_FAILED:
      return {
        ...state,
        errorTodos: actions.error,
        isFetching: false
      };

    default:
      return state;
  }
}