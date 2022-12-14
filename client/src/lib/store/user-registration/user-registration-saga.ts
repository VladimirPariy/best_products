import { AxiosError } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  userRegistrationPending,
  userRegistrationFulfilled,
  userRegistrationTrigger,
  userRegistrationRejected,
} from "lib/store/user-registration/user-registration-actions";

import { IRegistrationData } from "lib/interfaces/registration-data.interface";
import { IReturningUserData } from "lib/interfaces/returning-user-data";
import AuthApi from "lib/api/auth-api";

function* userRegistrationWorker(action: PayloadAction<IRegistrationData>) {
  yield put(userRegistrationPending());

  try {
    const data: IReturningUserData = yield call(
      AuthApi.registration,
      action.payload
    );
    yield put(userRegistrationFulfilled(data));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        userRegistrationRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* userRegistrationWatcher() {
  yield takeLatest(userRegistrationTrigger.type, userRegistrationWorker);
}
