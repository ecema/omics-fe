import { PayloadAction } from "@reduxjs/toolkit";
import { getOmicAnalysis, getOmicList } from "./omicService";
import {
  getOmicListFailure,
  getOmicListStart,
  getOmicListSuccess,
  getOmicAnalysisStart,
  getOmicAnalysisSuccess,
  getOmicAnalysisFailure,
} from "./omicSlice";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";

function* getOmicListData(action: PayloadAction<{ geneList: string }>) {
  try {
    const { data } = yield call(getOmicList, action?.payload?.geneList);
    yield put(getOmicListSuccess(data));
  } catch (error: any) {
    yield put(getOmicListFailure(error));
  }
}
function* getOmicAnalysisData(action: PayloadAction<{ id: string }>) {
  try {
    const { data } = yield call(getOmicAnalysis, action?.payload?.id);
    yield put(getOmicAnalysisSuccess(data));
  } catch (error: any) {
    yield put(getOmicAnalysisFailure(error));
  }
}

function* watchGetOmicList() {
  yield takeLatest(getOmicListStart, getOmicListData);
}

function* watchGetOmicAnalysis() {
  yield takeLatest(getOmicAnalysisStart, getOmicAnalysisData);
}

export default function* omicSaga() {
  yield all([fork(watchGetOmicList), fork(watchGetOmicAnalysis)]);
}
