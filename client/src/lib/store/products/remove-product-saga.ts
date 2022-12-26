import { PayloadAction } from "@reduxjs/toolkit";
import ProductsApi from "lib/api/products-api";
import { IProduct } from "lib/interfaces/products/product";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError, AxiosResponse } from "axios";

import {
  removeProductRejected,
  removeProductFulfilled,
  removeProductPending,
  removeProductTrigger,
} from "lib/store/products/products-actions";

function* removeProductWorker(action: PayloadAction<number>) {
  yield put(removeProductPending());
  try {
    const res: AxiosResponse = yield call(
      ProductsApi.removeOneProduct,
      action.payload
    );
    if (res.status === 200) {
      const products: IProduct[] = yield call(ProductsApi.getAllProducts);
      yield put(removeProductFulfilled(products));
    }
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


