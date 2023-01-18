import {PayloadAction} from "@reduxjs/toolkit";
import CommentsApi from "lib/api/comments-api";
import {call, put, takeLatest} from "redux-saga/effects";
import {AxiosError} from "axios";
import {removeCommentFulfilled, removeCommentPending, removeCommentRejected, removeCommentTrigger} from "store/comments/comments-actions";
import {decrementCommentsAmount} from "store/product-detail/product-detail-actions";

function* removeCommentWorker({payload}: PayloadAction<number>) {
  yield put(removeCommentPending());
  try {
    const res: { id: number } = yield call(
      CommentsApi.removeComment,
      payload
    );

    yield put(removeCommentFulfilled(res));
    yield put(decrementCommentsAmount())
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        removeCommentRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* removeCommentWatcher() {
  yield takeLatest(removeCommentTrigger.type, removeCommentWorker);
}
