import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import FeedbacksApi from "lib/api/feedbacks-api";
import {
  IDataForAddFeedback,
  IFeedback,
} from "lib/interfaces/feedbacks.interface";
import {
  incrementNegativeFeedbackCounterInFavoriteList,
  incrementPositiveFeedbackCounterInFavoriteList,
} from "store/favorite-products/favorite-products-actions";
import {
  addFeedbackTrigger,
  addFeedbackFulfilled,
  feedbacksPending,
  feedbacksRejected,
} from "store/feedbacks/feedbacks-actions";
import {
  incrementNegativeFeedbackCounter,
  incrementPositiveFeedbackCounter,
} from "store/products/products-actions";

function* addFeedbackWorker({ payload }: PayloadAction<IDataForAddFeedback>) {
  yield put(feedbacksPending());
  try {
    const res: IFeedback = yield call(FeedbacksApi.addFeedback, payload);
    yield put(addFeedbackFulfilled(res));
    if (res.feedback_type === 1) {
      yield put(incrementPositiveFeedbackCounter(res.product));
      yield put(incrementPositiveFeedbackCounterInFavoriteList(res.product));
    }
    if (res.feedback_type === 0) {
      yield put(incrementNegativeFeedbackCounter(res.product));
      yield put(incrementNegativeFeedbackCounterInFavoriteList(res.product));
    }
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        feedbacksRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* addFeedbackWatcher() {
  yield takeLatest(addFeedbackTrigger.type, addFeedbackWorker);
}
