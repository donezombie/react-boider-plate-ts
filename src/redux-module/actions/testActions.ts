import * as types from 'redux-module/types';

export const fetchData = () => {
  return {
    type: types.REQUEST_LIST_USER,
  }
}