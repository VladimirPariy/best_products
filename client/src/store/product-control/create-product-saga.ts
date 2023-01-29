import { PayloadAction } from "@reduxjs/toolkit";
import ProductControlApi from "lib/api/product-control-api";
import { IDataForCreating } from "lib/interfaces/products/creating-product.interface";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import {
  createProductTrigger,
  createProductFulfilled,
  productControlPending,
  productControlRejected,
} from "store/product-control/product-control-actions";

function* createProductWorker({ payload }: PayloadAction<IDataForCreating>) {
  yield put(productControlPending());
  try {
    yield call(ProductControlApi.createNewProduct, payload);

    yield put(createProductFulfilled());
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

export function* createProductWatcher() {
  yield takeLatest(createProductTrigger.type, createProductWorker);
}
