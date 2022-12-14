import { combineReducers } from "@reduxjs/toolkit";
import { userRegistrationReducer } from "lib/store/user-registration/user-registration-reducer";

export const rootReducer = combineReducers({
  user: userRegistrationReducer,
});
