import { all } from "redux-saga/effects";
import { addCommentWatcher } from "store/comments/add-comment-saga";
import { commentsWatcher } from "store/comments/comments-saga";
import { removeCommentWatcher } from "store/comments/remove-comment-saga";
import { addIntoFavoriteWatcher } from "store/favorite-products/add-into-favorite-saga";
import { favoriteProductsWatcher } from "store/favorite-products/favorite-products-saga";
import { removeFromFavoriteWatcher } from "store/favorite-products/remove-from-favorite-saga";
import { getFeedbacksWatcher } from "store/feedbacks/get-feedbacks-saga";
import { priceHistoryWatcher } from "store/price-history/price-history-saga";
import { createProductWatcher } from "store/product-control/create-product-saga";
import { productDetailWatcher } from "store/product-detail/product-detail-saga";
import { removeImageWatcher } from "store/product-detail/remove-image-saga";
import { uploadImageWatcher } from "store/product-detail/upload-image-saga";
import { productsListWatcher } from "store/products/products-list-saga";
import { removeProductWatcher } from "store/products/remove-product-saga";
import { searchWatcher } from "store/search/search-saga";
import { changeUserRoleWatcher } from "store/users-list/change-user-role-saga";
import { removeUserWatcher } from "store/users-list/remove-user-saga";
import { usersRolesWatcher } from "store/users-roles/users-roles-saga";
import { categoriesWatcher } from "store/categories/categories-saga";
import { usersListWatcher } from "store/users-list/users-list-saga";
import { userInfoWatcher } from "store/user/user-info-saga";
import { userUpdateWatcher } from "store/user/user-update-saga";
import { userAuthWatcher } from "store/user/user-auth-saga";

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
    priceHistoryWatcher(),
    commentsWatcher(),
    addCommentWatcher(),
    removeCommentWatcher(),
    favoriteProductsWatcher(),
    addIntoFavoriteWatcher(),
    removeFromFavoriteWatcher(),
    changeUserRoleWatcher(),
    removeUserWatcher(),
    createProductWatcher(),
    getFeedbacksWatcher(),
  ]);
}
