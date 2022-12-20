import {AxiosError} from "axios";
import {call, put, takeLatest} from "redux-saga/effects";

import {getCategories} from "lib/api/get-categories";
import {ICategory} from "lib/interfaces/categories/categories.interface";
import {categoriesFulfilled, categoriesPending, categoriesRejected, categoriesTrigger} from "lib/store/categories/categories-actions";

function* categoriesWorker() {
  yield put(categoriesPending());
  try {
    const categories: ICategory[] = yield call(getCategories);

    yield put(categoriesFulfilled(categories));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        categoriesRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* categoriesWatcher() {
  yield takeLatest(categoriesTrigger.type, categoriesWorker);
}
