import {AxiosError, AxiosResponse} from "axios";
import {call, put, takeLatest} from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";

import {
  userUpdateTrigger,
  updateUserPending,
  updateUserFulfilled,
  updateUserReject,
} from "lib/store/user/user-actions";

import UserApi from "lib/api/user-api";
import {IUserUpdateData} from "lib/interfaces/user-update-data.interface";
import {IReturningUserData} from "lib/interfaces/returning-user-data";

function* userUpdateWorker({payload}: PayloadAction<IUserUpdateData>) {
  yield put(updateUserPending());
  try {

    const updateUser: AxiosResponse = yield call(UserApi.updateUserInfo, payload)
    if (updateUser.status === 200) {
      const {id, token} = payload
      const getUser: IReturningUserData = yield call(
        UserApi.getUserInfo,
        {id, token}
      );
      yield put(updateUserFulfilled(getUser));
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
