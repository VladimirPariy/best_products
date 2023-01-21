import { PayloadAction } from "@reduxjs/toolkit";
import { priceHistoryApi } from "lib/api/price-history-api";
import { IShotPriceHistory } from "lib/interfaces/price-history/price-history.interface";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import {
  getPriceHistoryFulfilled,
  getPriceHistoryPending,
  getPriceHistoryRejected,
  getPriceHistoryTrigger,
} from "store/price-history/price-history-actions";

function* priceHistoryWorker({ payload }: PayloadAction<number>) {
  yield put(getPriceHistoryPending());
  try {
    const res: IShotPriceHistory[] = yield call(priceHistoryApi, payload);

    yield put(getPriceHistoryFulfilled(res));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        getPriceHistoryRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* priceHistoryWatcher() {
  yield takeLatest(getPriceHistoryTrigger.type, priceHistoryWorker);
}
