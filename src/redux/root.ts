import { all, spawn, call } from "redux-saga/effects";
import watchCreatorSaga from "./creators";
import { combineReducers } from "./creators/modules";

export function* rootSagas() {
  const sagas = [watchCreatorSaga];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      }),
    ),
  );
}

export const rootReducers = combineReducers;
