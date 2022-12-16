import {AxiosError} from "axios";
import {call, put, takeLatest} from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";

import {
  userUpdateTrigger,
  updateUserPending,
  updateUserFulfilled,
  updateUserReject,
} from "lib/store/user/user-actions";

import UserUpdateApi from "lib/api/user-update-api";
import {IUserUpdateData} from "lib/interfaces/user-update-data.interface";
import {IReturningUserData} from "lib/interfaces/returning-user-data";

function* userUpdateWorker({payload}: PayloadAction<IUserUpdateData>) {
  yield put(updateUserPending());
  try {
    const data: IReturningUserData = yield call(
      UserUpdateApi.updateUserInfo,
      payload
    );

    yield put(updateUserFulfilled(data));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        updateUserReject({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* userUpdateWatcher() {
  yield takeLatest(userUpdateTrigger.type, userUpdateWorker);
}
