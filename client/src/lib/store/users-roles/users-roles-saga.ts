import AdminApi from "lib/api/admin-api";
import {IRole} from "lib/interfaces/user-interfaces/user";
import {call, put, takeLatest} from "redux-saga/effects";
import {AxiosError} from "axios";


import {
  usersRolesFulfilled, usersRolesRejected, usersRolesTrigger, usersRolesPending
} from "lib/store/users-roles/users-roles-actions";

function* usersRolesWorker() {
  yield put(usersRolesPending());
  try {

    const res: IRole[] = yield call(AdminApi.getAllRoles);

    yield put(usersRolesFulfilled(res));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        usersRolesRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* usersRolesWatcher() {
  yield takeLatest(usersRolesTrigger.type, usersRolesWorker);
}
