import { PayloadAction } from "@reduxjs/toolkit";
import ProductsApi from "lib/api/products-api";
import {
  IProductImages,
  IUploadImage,
} from "lib/interfaces/products/upload-image";
import {
  uploadProductImageTrigger,
  uploadProductImageFulfilled,
  uploadProductImagePending,
  uploadProductImageRejected,
} from "store/product-detail/product-detail-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

function* uploadImageWorker({ payload }: PayloadAction<IUploadImage>) {
  yield put(uploadProductImagePending());
  try {
    const res: IProductImages = yield call(ProductsApi.uploadFile, payload);
    yield put(uploadProductImageFulfilled(res));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        uploadProductImageRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* uploadImageWatcher() {
  yield takeLatest(uploadProductImageTrigger.type, uploadImageWorker);
}
