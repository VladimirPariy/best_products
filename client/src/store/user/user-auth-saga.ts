import { AxiosError } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  userTokenPending,
  userTokenFulfilled,
  userTokenRejected,
  userTokenTrigger,
} from "store/user/user-actions";

import AuthApi from "lib/api/auth-api";
import { TokenType } from "lib/interfaces/user/token";
import { IRegistrationData } from "lib/interfaces/user/registration-data";
import { ILoginData } from "lib/interfaces/user/login-data";

function* userAuthWorker(
  action: PayloadAction<IRegistrationData | ILoginData>
) {
  let token: TokenType;
  yield put(userTokenPending());

  try {
    if (action.payload instanceof IRegistrationData) {
      token = yield call(AuthApi.registration, action.payload);
    } else {
      token = yield call(AuthApi.login, action.payload);
    }
    yield put(userTokenFulfilled(token));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        userTokenRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* userAuthWatcher() {
  yield takeLatest(userTokenTrigger.type, userAuthWorker);
}
