import { createStore, applyMiddleware } from 'redux';
import createMiddlewareSaga from 'redux-saga';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducers, rootSagas } from 'redux/root';

// setup middleware
const sagaMiddleware = createMiddlewareSaga();
const middleware = [sagaMiddleware, createLogger()];

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middleware)));
sagaMiddleware.run(rootSagas);

export default store;
