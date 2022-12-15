import {AxiosError} from "axios";
import {call, put, takeLatest} from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";

import {
  userInfoFulfilled,
  userInfoRejected,
  userInfoPending,
  userLoginTrigger,
} from "lib/store/user/user-actions";

import {ILoginData} from "lib/interfaces/login-data";
import {IReturningUserData} from "lib/interfaces/returning-user-data";
import AuthApi from "lib/api/auth-api";

function* userSignInWorker(action: PayloadAction<ILoginData>) {
  yield put(userInfoPending());
  try {
    const data: IReturningUserData = yield call(AuthApi.login, action.payload);

    yield put(userInfoFulfilled(data));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        userInfoRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* userSignInWatcher() {
  yield takeLatest(userLoginTrigger.type, userSignInWorker);
}
