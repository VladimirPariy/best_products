import { combineReducers } from "@reduxjs/toolkit";
import {userRegistrationReducer} from "store/reducers/user-registration-reducer";

export const rootReducer = combineReducers({
  user: userRegistrationReducer,
});



