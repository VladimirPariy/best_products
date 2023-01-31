import { PayloadAction } from "@reduxjs/toolkit";
import ProductControlApi from "lib/api/product-control-api";
import ProductDetailApi from "lib/api/product-detail-api";
import { IProductDetails } from "lib/interfaces/product-details.interface";
import { incrementViewFavorite } from "store/favorite-products/favorite-products-actions";
import {
  getProductDetailFulfilled,
  getProductDetailPending,
  getProductDetailRejected,
  getProductDetailTrigger,
} from "store/product-detail/product-detail-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError, AxiosResponse } from "axios";
import { incrementViewCounter } from "store/products/products-actions";

function* productDetailWorker({ payload }: PayloadAction<number>) {
  yield put(getProductDetailPending());
  try {
    const addView: AxiosResponse<{ productId: number }> = yield call(
      ProductControlApi.addView,
      payload
    );
    if (addView.status === 200) {
      yield put(incrementViewCounter(addView.data.productId));
      yield put(incrementViewFavorite(addView.data.productId));
    }
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
