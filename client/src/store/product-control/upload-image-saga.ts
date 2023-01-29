import { PayloadAction } from "@reduxjs/toolkit";
import ProductControlApi from "lib/api/product-control-api";
import {
  IProductImages,
  IUploadImage,
} from "lib/interfaces/products/upload-image.interface";
import {
  productControlPending,
  productControlRejected,
  uploadProductImageFulfilled,
  uploadProductImageTrigger,
} from "store/product-control/product-control-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import { addImage } from "store/product-detail/product-detail-actions";

function* uploadImageWorker({ payload }: PayloadAction<IUploadImage>) {
  yield put(productControlPending());
  try {
    const res: IProductImages = yield call(
      ProductControlApi.uploadFile,
      payload
    );
    yield put(uploadProductImageFulfilled());
    yield put(addImage(res));
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

export function* uploadImageWatcher() {
  yield takeLatest(uploadProductImageTrigger.type, uploadImageWorker);
}
