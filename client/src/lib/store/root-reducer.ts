import {combineReducers} from "@reduxjs/toolkit";
import {categoriesReducer} from "lib/store/categories/categories-reducer";
import {userReducer} from "lib/store/user/user-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});
