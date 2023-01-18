import {all} from "redux-saga/effects";
import {addCommentWatcher} from "store/comments/add-comment-saga";
import {commentsWatcher} from "store/comments/comments-saga";
import {removeCommentWatcher} from "store/comments/remove-comment-saga";
import {productDetailWatcher} from "store/product-detail/product-detail-saga";
import {removeImageWatcher} from "store/product-detail/remove-image-saga";
import {uploadImageWatcher} from "store/product-detail/upload-image-saga";
import {productsListWatcher} from "store/products/products-list-saga";
import {removeProductWatcher} from "store/products/remove-product-saga";
import {searchWatcher} from "store/search/search-saga";
import {usersRolesWatcher} from "store/users-roles/users-roles-saga";
import {categoriesWatcher} from "store/categories/categories-saga";
import {usersListWatcher} from "store/users-list/users-list-saga";
import {userInfoWatcher} from "store/user/user-info-saga";
import {userUpdateWatcher} from "store/user/user-update-saga";
import {userAuthWatcher} from "store/user/user-auth-saga";

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
    productDetailWatcher(),
    uploadImageWatcher(),
    removeImageWatcher(),
    searchWatcher(),
    commentsWatcher(),
    addCommentWatcher(),
    removeCommentWatcher(),
  ]);
}
