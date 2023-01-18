import { PayloadAction } from "@reduxjs/toolkit";
import CommentsApi from "lib/api/comments-api";
import {IShotCommentsWithUser} from "lib/interfaces/comments/comments.interface";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import {getCommentsFulfilled, getCommentsPending, getCommentsRejected, getCommentsTrigger} from "store/comments/comments-actions";

function* commentsWorker({ payload }: PayloadAction<number>) {
  yield put(getCommentsPending());
  try {
    const res:IShotCommentsWithUser[]  = yield call(
      CommentsApi.getCommentsByProductId,
      payload
    );

    yield put(getCommentsFulfilled(res));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        getCommentsRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* commentsWatcher() {
  yield takeLatest(getCommentsTrigger.type, commentsWorker);
}
