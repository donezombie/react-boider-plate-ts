import { combineReducers } from 'redux';
import authReducer from './authReducer';
import todosReducer from './todosReducer';

export default combineReducers({
  authReducer,
  todosReducer,
});