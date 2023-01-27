import { PayloadAction } from "@reduxjs/toolkit";
import ProductsApi from "lib/api/products-api";
import {
  IProductImages,
  IUploadImage,
} from "lib/interfaces/products/upload-image.interface";
import {
  uploadProductImageTrigger,
  uploadProductImageFulfilled,
  changeProductImageRejected,
  changeProductImagePending,
} from "store/product-detail/product-detail-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

function* uploadImageWorker({ payload }: PayloadAction<IUploadImage>) {
  yield put(changeProductImagePending());
  try {
    const res: IProductImages = yield call(ProductsApi.uploadFile, payload);
    yield put(uploadProductImageFulfilled(res));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        changeProductImageRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* uploadImageWatcher() {
  yield takeLatest(uploadProductImageTrigger.type, uploadImageWorker);
}
