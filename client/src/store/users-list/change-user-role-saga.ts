import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

import UserApi from "lib/api/user-api";
import { IDataForUpdateUserRole } from "lib/interfaces/user-role.interface";
import { IUser } from "lib/interfaces/user/user.interface";

import {
  changeUserRoleFulfilled,
  changeUserRoleTrigger,
  userPending,
  userRejected,
} from "store/users-list/users-list-actions";

function* changeUserRoleWorker({
  payload,
}: PayloadAction<IDataForUpdateUserRole>) {
  yield put(userPending());
  try {
    const res: IUser = yield call(UserApi.changeUserRole, payload);

    yield put(changeUserRoleFulfilled(res));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        userRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* changeUserRoleWatcher() {
  yield takeLatest(changeUserRoleTrigger.type, changeUserRoleWorker);
}
