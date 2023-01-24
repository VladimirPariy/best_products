import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import FeedbacksApi from "lib/api/feedbacks-api";
import { IFeedback } from "lib/interfaces/feedbacks/feedbacks.interface";
import {
  getFeedbacksFulfilled,
  getFeedbacksPending,
  getFeedbacksRejected,
  getFeedbacksTrigger,
} from "store/feedbacks/feedbacks-actions";

function* getFeedbacksWorker({ payload }: PayloadAction<number>) {
  yield put(getFeedbacksPending());
  try {
    const res: IFeedback[] = yield call(FeedbacksApi.getUserFeedbacks, payload);

    yield put(getFeedbacksFulfilled(res));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        getFeedbacksRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* getFeedbacksWatcher() {
  yield takeLatest(getFeedbacksTrigger.type, getFeedbacksWorker);
}
