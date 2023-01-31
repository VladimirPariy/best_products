import { PayloadAction } from "@reduxjs/toolkit";
import { ISearchData } from "lib/interfaces/search.interface";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError, AxiosResponse } from "axios";

import ProductsApi from "lib/api/products-api";

import {
  searchFulfilled,
  searchPending,
  searchRejected,
  searchTrigger,
} from "store/search/search-action";

function* searchWorker({ payload }: PayloadAction<string>) {
  yield put(searchPending());
  try {
    const result: AxiosResponse<ISearchData> = yield call(
      ProductsApi.search,
      payload
    );
    yield put(searchFulfilled(result.data));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        searchRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* searchWatcher() {
  yield takeLatest(searchTrigger.type, searchWorker);
}
