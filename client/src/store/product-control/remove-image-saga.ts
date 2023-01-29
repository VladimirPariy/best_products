import { PayloadAction } from "@reduxjs/toolkit";
import ProductControlApi from "lib/api/product-control-api";
import {
  productControlPending,
  productControlRejected,
  removeProductImageFulfilled,
  removeProductImageTrigger,
} from "store/product-control/product-control-actions";
import { removeImage } from "store/product-detail/product-detail-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

function* removeImageWorker({ payload }: PayloadAction<{ id: number }>) {
  const { id } = payload;
  yield put(productControlPending());
  try {
    yield call(ProductControlApi.dropImage, id);
    yield put(removeProductImageFulfilled());
    yield put(removeImage(id));
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

export function* removeImageWatcher() {
  yield takeLatest(removeProductImageTrigger.type, removeImageWorker);
}
