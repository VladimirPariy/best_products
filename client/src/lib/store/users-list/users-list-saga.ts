import userApi from "lib/api/user-api";
import {call, put, takeLatest} from "redux-saga/effects";
import {AxiosError} from "axios";

import {IUser} from "lib/interfaces/user-interfaces/user";

import {
  usersListRejected,
  usersListTrigger,
  usersListPending,
  usersListFulfilled,
} from "lib/store/users-list/users-list-actions";

function* usersListWorker() {
  yield put(usersListPending());
  try {
    const res: IUser[] = yield call(userApi.getAllUsers);

    yield put(usersListFulfilled(res));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        usersListRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* usersListWatcher() {
  yield takeLatest(usersListTrigger.type, usersListWorker);
}
