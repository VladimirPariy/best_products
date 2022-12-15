import {userSignInWatcher} from "lib/store/user/user-sign-in-saga";
import {userUpdateWatcher} from "lib/store/user/user-update-saga";
import {all} from "redux-saga/effects";
import {userSignUpWatcher} from "lib/store/user/user-sign-up-saga";

export default function* rootSaga() {
  yield all([userSignUpWatcher(), userSignInWatcher(), userUpdateWatcher()]);
}
