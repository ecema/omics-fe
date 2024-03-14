import omicSaga from "./omic/omicSaga";
import { all, fork } from "redux-saga/effects";

export function* rootSaga() {
  yield all([fork(omicSaga)]);
}
