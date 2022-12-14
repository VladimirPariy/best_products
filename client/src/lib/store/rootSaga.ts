import { userSignInWatcher } from "lib/store/user-auth/user-sign-in-saga";
import { all } from "redux-saga/effects";
import { userSignUpWatcher } from "lib/store/user-auth/user-sign-up-saga";

export default function* rootSaga() {
  yield all([userSignUpWatcher(), userSignInWatcher()]);
}
