import { combineReducers } from "@reduxjs/toolkit";
import { categoriesReducer } from "lib/store/categories/categories-reducer";
import { productDetailReducer } from "lib/store/product-detail/product-detail-reducer";
import { productsReducer } from "lib/store/products/products-reducer";
import { searchReducer } from "lib/store/search/search-reducer";
import { usersListReducer } from "lib/store/users-list/users-list-reducer";
import { userReducer } from "lib/store/user/user-reducer";
import { usersRolesReducer } from "lib/store/users-roles/users-roles-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  usersList: usersListReducer,
  usersRoles: usersRolesReducer,
  products: productsReducer,
  productDetail: productDetailReducer,
  search: searchReducer,
});
