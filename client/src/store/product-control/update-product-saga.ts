import { PayloadAction } from "@reduxjs/toolkit";
import ProductControlApi from "lib/api/product-control-api";
import { IProduct } from "lib/interfaces/products/product.interface";
import { UpdatingProductDetailsInterface } from "lib/interfaces/products/updating-product-details.interface";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import { updateProductInFavoriteList } from "store/favorite-products/favorite-products-actions";
import {
  productControlPending,
  productControlRejected,
  updateProductFulfilled,
  updateProductTrigger,
} from "store/product-control/product-control-actions";
import { updateProductInProductList } from "store/products/products-actions";

function* updateProductWorker({
  payload,
}: PayloadAction<UpdatingProductDetailsInterface>) {
  yield put(productControlPending());
  try {
    const res: IProduct = yield call(ProductControlApi.updateProduct, payload);
    console.log(res);
    yield put(updateProductFulfilled());
    yield put(updateProductInProductList(res));
    yield put(updateProductInFavoriteList(res));
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

export function* updateProductWatcher() {
  yield takeLatest(updateProductTrigger.type, updateProductWorker);
}
