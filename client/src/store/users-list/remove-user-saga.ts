import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

import UserApi from "lib/api/user-api";

import {
  removeUserFulfilled,
  removeUserTrigger,
  userPending,
  userRejected,
} from "store/users-list/users-list-actions";

function* removeUserWorker({ payload }: PayloadAction<number>) {
  yield put(userPending());
  try {
    const res: { userId: number } = yield call(UserApi.removeOneUser, payload);

    yield put(removeUserFulfilled(res));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        userRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* removeUserWatcher() {
  yield takeLatest(removeUserTrigger.type, removeUserWorker);
}
