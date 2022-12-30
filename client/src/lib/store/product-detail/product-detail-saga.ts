import { PayloadAction } from "@reduxjs/toolkit";
import ProductsApi from "lib/api/products-api";
import { IProductDetails } from "lib/interfaces/products/product-details";
import {
  getProductDetailFulfilled,
  getProductDetailPending,
  getProductDetailRejected,
  getProductDetailTrigger,
} from "lib/store/product-detail/product-detail-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

function* productDetailWorker(action: PayloadAction<{ id: number }>) {
  const { id } = action.payload;
  yield put(getProductDetailPending());
  try {
    const res: IProductDetails = yield call(ProductsApi.getProductDetail, id);

    yield put(getProductDetailFulfilled(res));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        getProductDetailRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* productDetailWatcher() {
  yield takeLatest(getProductDetailTrigger.type, productDetailWorker);
}
