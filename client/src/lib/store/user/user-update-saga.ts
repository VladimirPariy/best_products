import {AxiosError, AxiosResponse} from "axios";
import {TokenType} from "lib/interfaces/user-interfaces/token";
import {IUser} from "lib/interfaces/user-interfaces/user";
import {call, put, takeLatest} from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";

import {
  userUpdateTrigger,
  updateUserPending,
  updateUserFulfilled,
  updateUserReject,
} from "lib/store/user/user-actions";

import UserApi from "lib/api/user-api";
import {IUserUpdateData} from "lib/interfaces/user-interfaces/user-update-data.interface";

function* userUpdateWorker({payload}: PayloadAction<IUserUpdateData>) {
  let getUser: IUser;
  let newToken: string;
  yield put(updateUserPending());
  try {
    const updateUser: AxiosResponse = yield call(
      UserApi.updateUserInfo,
      payload
    );

    if (updateUser.status === 200) {
      const {id, token} = payload;
      if (token) {
        getUser = yield call(UserApi.getUserInfo, {id, token});
        newToken = yield call(UserApi.getNewToken, {id, token});
        yield put(updateUserFulfilled({user: getUser, token: newToken}));
      }
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
