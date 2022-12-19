import { userInfoWatcher } from "lib/store/user/user-info-saga";
import { userUpdateWatcher } from "lib/store/user/user-update-saga";
import { all } from "redux-saga/effects";
import { userAuthWatcher } from "lib/store/user/user-auth-saga";

export default function* rootSaga() {
  yield all([userAuthWatcher(), userInfoWatcher(), userUpdateWatcher()]);
}
