import ReducerInterface from 'interfaces/reducerInterface';
import * as types from 'redux-module/types';

const initialState = {
  isLogin: false,
  errorLogin: null,
};

export default (state = initialState, actions: ReducerInterface) => {
  switch(actions.type) {
    case types.REQUEST_LOGIN:
      return {
        ...state,
        isLogin: false,
      };

    case types.REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        errorLogin: null,
      };

    case types.REQUEST_LOGIN_FAILED:
      return {
        ...state,
        errorLogin: actions.error,
        isLogin: false,
      };

      default:
        return state;
  }
};
