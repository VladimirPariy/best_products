import { PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

import UserApi from "lib/api/user-api";
import { IToken, TokenType } from "lib/interfaces/user/token.interface";
import { IUser } from "lib/interfaces/user/user.interface";

import {
  userInfoFulfilled,
  userInfoRejected,
  userInfoPending,
  userInfoTrigger,
} from "store/user/user-actions";

function* userInfoWorker(action: PayloadAction<TokenType>) {
  const token = action.payload;
  yield put(userInfoPending());
  try {
    const { id }: IToken = jwt_decode(token);

    const user: IUser = yield call(UserApi.getUserInfo, id);

    yield put(userInfoFulfilled(user));
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

export function* userInfoWatcher() {
  yield takeLatest(userInfoTrigger.type, userInfoWorker);
}
