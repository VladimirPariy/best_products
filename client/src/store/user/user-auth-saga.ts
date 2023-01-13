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
import { TokenType } from "lib/interfaces/user-interfaces/token";
import { IRegistrationData } from "lib/interfaces/user-interfaces/registration-data";
import { ILoginData } from "lib/interfaces/user-interfaces/login-data";

function* userAuthWorker(
  action: PayloadAction<IRegistrationData | ILoginData>
) {
  let token: TokenType;
  yield put(userTokenPending());

  try {
    if (action.payload instanceof IRegistrationData) {
      token = yield call(AuthApi.registration, action.payload);
    } else if (action.payload instanceof ILoginData) {
      token = yield call(AuthApi.login, action.payload);
    } else {
      throw new Error();
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
