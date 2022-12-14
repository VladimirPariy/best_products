import { PayloadAction } from "@reduxjs/toolkit";
import ProductsApi from "lib/api/products-api";
import {
  removeProductImageFulfilled,
  removeProductImagePending,
  removeProductImageTrigger,
  removeProductImageRejected,
} from "lib/store/product-detail/product-detail-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

function* removeImageWorker({ payload }: PayloadAction<{ id: number }>) {
  const { id } = payload;
  yield put(removeProductImagePending());
  try {
    yield call(ProductsApi.dropImage, id);
    yield put(removeProductImageFulfilled(id));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        removeProductImageRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* removeImageWatcher() {
  yield takeLatest(removeProductImageTrigger.type, removeImageWorker);
}
