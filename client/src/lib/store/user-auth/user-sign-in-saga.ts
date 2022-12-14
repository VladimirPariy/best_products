import { AxiosError } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  userAuthFulfilled,
  userAuthRejected,
  userRegistrationTrigger,
  userAuthPending,
  userLoginTrigger,
} from "lib/store/user-auth/user-auth-actions";

import { ILoginData } from "lib/interfaces/login-data";
import { IReturningUserData } from "lib/interfaces/returning-user-data";
import AuthApi from "lib/api/auth-api";

function* userSignInWorker(action: PayloadAction<ILoginData>) {
  yield put(userAuthPending());
  console.log(action.payload);
  try {
    const data: IReturningUserData = yield call(AuthApi.login, action.payload);

    yield put(userAuthFulfilled(data));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        userAuthRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* userSignInWatcher() {
  yield takeLatest(userLoginTrigger.type, userSignInWorker);
}
