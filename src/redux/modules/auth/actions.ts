import * as types from 'redux/types';

export const login = (username: string, password: string) => ({
  type: types.REQUEST_LOGIN,
  payload: {
    username,
    password,
  },
});
