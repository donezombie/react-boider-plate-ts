import { all, takeEvery, takeLatest } from "redux-saga/effects";
import { combineSaga } from "./modules";

const generatedWatchedServices = Object.entries(combineSaga).map(([typeAction, act]) => {
  if (act.isTakeEvery) {
    return takeEvery(typeAction, act.saga);
  }

  return takeLatest(typeAction, act.saga);
});

export default function* watchCreatorSaga() {
  yield all(generatedWatchedServices.map((saga) => saga));
}
