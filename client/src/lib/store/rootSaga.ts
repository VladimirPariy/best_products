import {productsListWatcher} from "lib/store/products/products-list-saga";
import {removeProductWatcher} from "lib/store/products/remove-product-saga";
import {all} from "redux-saga/effects";
import {usersRolesWatcher} from "lib/store/users-roles/users-roles-saga";
import {categoriesWatcher} from "lib/store/categories/categories-saga";
import {usersListWatcher} from "lib/store/user-list/users-list-saga";
import {userInfoWatcher} from "lib/store/user/user-info-saga";
import {userUpdateWatcher} from "lib/store/user/user-update-saga";
import {userAuthWatcher} from "lib/store/user/user-auth-saga";

export default function* rootSaga() {
  yield all([
    userAuthWatcher(),
    userInfoWatcher(),
    userUpdateWatcher(),
    categoriesWatcher(),
    usersListWatcher(),
    usersRolesWatcher(),
    productsListWatcher(),
    removeProductWatcher(),
  ]);
}
