import {AxiosError} from "axios";
import {call, put, takeLatest} from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";

import {
  userInfoFulfilled,
  userInfoRejected,
  userRegistrationTrigger,
  userInfoPending
} from "lib/store/user/user-actions";

import {IRegistrationData} from "lib/interfaces/registration-data.interface";
import {IReturningUserData} from "lib/interfaces/returning-user-data";
import AuthApi from "lib/api/auth-api";

function* userSignUpWorker(action: PayloadAction<IRegistrationData>) {
  yield put(userInfoPending());

  try {
    const data: IReturningUserData = yield call(
      AuthApi.registration,
      action.payload
    );

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

export function* userSignUpWatcher() {
  yield takeLatest(userRegistrationTrigger.type, userSignUpWorker);
}
