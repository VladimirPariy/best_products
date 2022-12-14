import { all } from "redux-saga/effects";
import { userRegistrationWatcher } from "lib/store/user-registration/user-registration-saga";

export default function* rootSaga() {
  yield all([userRegistrationWatcher()]);
}
