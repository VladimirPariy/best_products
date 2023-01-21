import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { IDataForChangeFavorite } from "lib/interfaces/favorite/favorite";
import { IProduct } from "lib/interfaces/products/product.interface";
import {
  addIntoFavoriteFulfilled,
  addIntoFavoritePending,
  addIntoFavoriteRejected,
  addIntoFavoriteTrigger,
} from "store/favorite-products/favorite-products-actions";
import FavoriteProductsApi from "lib/api/favorite-products-api";

function* addIntoFavoriteWorker({
  payload,
}: PayloadAction<IDataForChangeFavorite>) {
  yield put(addIntoFavoritePending());
  try {
    const res: IProduct = yield call(
      FavoriteProductsApi.addIntoFavorite,
      payload
    );

    yield put(addIntoFavoriteFulfilled(res));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        addIntoFavoriteRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* addIntoFavoriteWatcher() {
  yield takeLatest(addIntoFavoriteTrigger.type, addIntoFavoriteWorker);
}
