import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";



export const rootReducer = combineReducers({

});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [''],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

