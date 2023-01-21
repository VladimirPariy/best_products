import { PayloadAction } from "@reduxjs/toolkit";
import CommentsApi from "lib/api/comments-api";
import {
  IDataForAddComment,
  IShotCommentsWithUser,
} from "lib/interfaces/comments/comments.interface";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import {
  addCommentFulfilled,
  addCommentPending,
  addCommentRejected,
  addCommentTrigger,
} from "store/comments/comments-actions";
import { incrementCommentsAmount } from "store/product-detail/product-detail-actions";

function* addCommentWorker({ payload }: PayloadAction<IDataForAddComment>) {
  yield put(addCommentPending());
  try {
    const res: IShotCommentsWithUser = yield call(
      CommentsApi.addComment,
      payload
    );

    yield put(addCommentFulfilled(res));
    yield put(incrementCommentsAmount());
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        addCommentRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* addCommentWatcher() {
  yield takeLatest(addCommentTrigger.type, addCommentWorker);
}
