import {combineReducers} from "@reduxjs/toolkit";
import {userAuthReducer} from "lib/store/user-auth/user-auth-reducer";

export const rootReducer = combineReducers({
  user: userAuthReducer,
});
