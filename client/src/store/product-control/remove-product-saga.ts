import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

import { removeProductFromFavoriteList } from "store/favorite-products/favorite-products-actions";
import ProductControlApi from "lib/api/product-control-api";
import {
  productControlPending,
  removeProductFulfilled,
  productControlRejected,
  removeProductTrigger,
} from "store/product-control/product-control-actions";
import { removeProductFromProductList } from "store/products/products-actions";
import { IFulfilledDataForRemove } from "lib/interfaces/favorite/favorite.interface";

function* removeProductWorker(action: PayloadAction<number>) {
  yield put(productControlPending());
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
        productControlRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* removeProductWatcher() {
  yield takeLatest(removeProductTrigger.type, removeProductWorker);
}
