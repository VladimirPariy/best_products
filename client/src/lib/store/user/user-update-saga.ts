import { AxiosError, AxiosResponse } from "axios";
import { IUser } from "lib/interfaces/user-interfaces/user";
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  userUpdateTrigger,
  updateUserPending,
  updateUserFulfilled,
  updateUserReject,
} from "lib/store/user/user-actions";

import UserApi from "lib/api/user-api";

function* userUpdateWorker({
  payload,
}: PayloadAction<{ formData: FormData; id: number }>) {
  const { id } = payload;
  yield put(updateUserPending());
  try {
    const updateUser: AxiosResponse = yield call(
      UserApi.updateUserInfo,
      payload
    );

    if (updateUser.status === 200) {
      const getUser: IUser = yield call(UserApi.getUserInfo, id);
      const newToken: string = yield call(UserApi.getNewToken, id);
      yield put(updateUserFulfilled({ user: getUser, token: newToken }));
    }
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
