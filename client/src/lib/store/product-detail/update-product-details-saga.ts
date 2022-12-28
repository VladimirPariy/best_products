import { PayloadAction } from "@reduxjs/toolkit";
import ProductsApi from "lib/api/products-api";
import { IProduct } from "lib/interfaces/products/product";
import { UpdatingProductDetails } from "lib/interfaces/products/updating-product-details";
import {
  IProductImages,
  IUploadImage,
} from "lib/interfaces/products/upload-image";
import {
  updateProductDetailFulfilled,
  updateProductDetailRejected,
  updateProductDetailTrigger,
  updateProductDetailPending,
} from "lib/store/product-detail/product-detail-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError, AxiosResponse } from "axios";

function* updateProductDetailsWorker({
  payload,
}: PayloadAction<UpdatingProductDetails>) {
  yield put(updateProductDetailPending());
  try {
    const res: AxiosResponse = yield call(
      ProductsApi.updateProductDetails,
      payload
    );

    if (res.status === 200) {
      const { id } = payload;
      const product: IProduct = yield call(ProductsApi.getProductDetail, id);

      yield put(updateProductDetailFulfilled(product));
    }
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        updateProductDetailRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* updateProductDetailsWatcher() {
  yield takeLatest(updateProductDetailTrigger.type, updateProductDetailsWorker);
}
