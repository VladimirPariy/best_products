import {all} from 'redux-saga/effects'
import {userRegistrationWatcher} from "store/sagas/user-registration-saga";

export default function* rootSaga() {
  yield all([
    userRegistrationWatcher(),
  ])
}