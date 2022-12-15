import {AxiosError} from "axios";
import {call, put, takeLatest} from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";

import {
  userAuthFulfilled,
  userAuthRejected,
  userRegistrationTrigger,
  userAuthPending,
} from "lib/store/user-auth/user-auth-actions";

import {IRegistrationData} from "lib/interfaces/registration-data.interface";
import {IReturningUserData} from "lib/interfaces/returning-user-data";
import AuthApi from "lib/api/auth-api";

function* userSignUpWorker(action: PayloadAction<IRegistrationData>) {
  yield put(userAuthPending());

  try {
    const data: IReturningUserData = yield call(
      AuthApi.registration,
      action.payload
    );

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

export function* userSignUpWatcher() {
  yield takeLatest(userRegistrationTrigger.type, userSignUpWorker);
}
