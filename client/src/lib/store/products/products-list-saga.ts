import { PayloadAction } from "@reduxjs/toolkit";
import ProductsApi from "lib/api/products-api";
import {IGetProductListTrigger, IProductDataResponse} from "lib/interfaces/products/product";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

import {
  productsListFulfilled,
  productsListPending,
  productsListRejected,
  productsListTrigger,
} from "lib/store/products/products-actions";

function* productsListWorker(
  action: PayloadAction<IGetProductListTrigger>
) {
  yield put(productsListPending());
  try {
    const res: IProductDataResponse = yield call(
      ProductsApi.getFilteredProducts,
      action.payload
    );
    yield put(productsListFulfilled(res));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        productsListRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* productsListWatcher() {
  yield takeLatest(productsListTrigger.type, productsListWorker);
}
