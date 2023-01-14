import { PayloadAction } from "@reduxjs/toolkit";
import ProductDetailApi from "lib/api/product-detail-api";
import { IProductDetails } from "lib/interfaces/product-detail/product-details";
import {
  getProductDetailFulfilled,
  getProductDetailPending,
  getProductDetailRejected,
  getProductDetailTrigger,
} from "store/product-detail/product-detail-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

function* productDetailWorker({ payload }: PayloadAction<number>) {
  yield put(getProductDetailPending());
  try {
    const res: IProductDetails = yield call(
      ProductDetailApi.getProductDetail,
      payload
    );

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
