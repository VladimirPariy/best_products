import {combineReducers} from "@reduxjs/toolkit";
import {userAuthReducer} from "lib/store/user-auth/user-auth-reducer";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

export const rootReducer = combineReducers({
  user: userAuthReducer,
});


const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

