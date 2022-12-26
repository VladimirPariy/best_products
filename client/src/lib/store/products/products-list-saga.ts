import ProductsApi from "lib/api/products-api";
import { IProduct } from "lib/interfaces/products/product";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

import {
  productsListFulfilled,
  productsListPending,
  productsListRejected,
  productsListTrigger,
} from "lib/store/products/products-actions";

function* productsListWorker() {
  yield put(productsListPending());
  try {
    const res: IProduct[] = yield call(ProductsApi.getAllProducts);

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
