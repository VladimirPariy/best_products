import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import FavoriteProductsApi from "lib/api/favorite-products-api";
import { IProduct } from "lib/interfaces/products/product.interface";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  getFavoriteProductsFulfilled,
  getFavoriteProductsPending,
  getFavoriteProductsRejected,
  getFavoriteProductsTrigger,
} from "store/favorite-products/favorite-products-actions";

function* favoriteProductsWorker({ payload }: PayloadAction<number>) {
  yield put(getFavoriteProductsPending());
  try {
    const res: IProduct[] = yield call(
      FavoriteProductsApi.getFavoriteProducts,
      payload
    );

    yield put(getFavoriteProductsFulfilled(res));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        getFavoriteProductsRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* favoriteProductsWatcher() {
  yield takeLatest(getFavoriteProductsTrigger.type, favoriteProductsWorker);
}
