import {combineReducers} from "@reduxjs/toolkit";
import {categoriesReducer} from "store/categories/categories-reducer";
import {commentsReducer} from "store/comments/comments-reducer";
import {modalsReducer} from "store/modals/modals-reducer";
import {priceHistoryReducer} from "store/price-history/price-history-reducer";
import {productDetailReducer} from "store/product-detail/product-detail-reducer";
import {productsReducer} from "store/products/products-reducer";
import {searchReducer} from "store/search/search-reducer";
import {usersListReducer} from "store/users-list/users-list-reducer";
import {userReducer} from "store/user/user-reducer";
import {usersRolesReducer} from "store/users-roles/users-roles-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  usersList: usersListReducer,
  usersRoles: usersRolesReducer,
  products: productsReducer,
  productDetail: productDetailReducer,
  search: searchReducer,
  modals: modalsReducer,
  comments: commentsReducer,
  priceHistory: priceHistoryReducer,
});
