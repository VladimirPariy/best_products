import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

import { removeProductFromFavoriteList } from "store/favorite-products/favorite-products-actions";
import ProductControlApi from "lib/api/product-control-api";
import {
  removeProductRejected,
  removeProductFulfilled,
  removeProductPending,
  removeProductTrigger,
} from "store/product-control/product-control-actions";
import { removeProductFromProductList } from "store/products/products-actions";
import { IFulfilledDataForRemove } from "lib/interfaces/favorite/favorite.interface";

function* removeProductWorker(action: PayloadAction<number>) {
  yield put(removeProductPending());
  try {
    const res: IFulfilledDataForRemove = yield call(
      ProductControlApi.removeOneProduct,
      action.payload
    );
    console.log(res);
    yield put(removeProductFulfilled(res));
    yield put(removeProductFromProductList(+res.productId));
    yield put(removeProductFromFavoriteList(+res.productId));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        removeProductRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* removeProductWatcher() {
  yield takeLatest(removeProductTrigger.type, removeProductWorker);
}
