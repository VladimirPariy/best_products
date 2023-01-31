import StatisticsApi from "lib/api/statistics-api";
import {
  IStatisticsUsers,
  IStatisticsCommented,
  IStatisticsRating,
  IStatisticsFavorites,
  IStatisticsPopular,
} from "lib/interfaces/statistics.interface";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import {
  getStatisticsPending,
  getUsersStatisticsFulfilled,
  getStatisticsRejected,
  getStatisticsTrigger,
  getCommentedStatisticsFulfilled,
  getPopularStatisticsFulfilled,
  getRatingStatisticsFulfilled,
  getFavoritesStatisticsFulfilled,
} from "store/statistics/statistics-actions";

function* statisticsWorker() {
  yield put(getStatisticsPending());
  try {
    const users: IStatisticsUsers[] = yield call(StatisticsApi.getNewUsers);
    const commented: IStatisticsCommented[] = yield call(
      StatisticsApi.getMostCommented
    );
    const popular: IStatisticsPopular[] = yield call(
      StatisticsApi.getMostPopular
    );
    const rating: IStatisticsRating[] = yield call(StatisticsApi.getMostRating);
    const favorites: IStatisticsFavorites[] = yield call(
      StatisticsApi.getMostFavorites
    );

    yield put(getUsersStatisticsFulfilled(users));
    yield put(getCommentedStatisticsFulfilled(commented));
    yield put(getPopularStatisticsFulfilled(popular));
    yield put(getRatingStatisticsFulfilled(rating));
    yield put(getFavoritesStatisticsFulfilled(favorites));
  } catch (error) {
    if (error instanceof AxiosError)
      yield put(
        getStatisticsRejected({
          status_message: error.request.response,
          status: error.request.status,
        })
      );
  }
}

export function* statisticsWatcher() {
  yield takeLatest(getStatisticsTrigger.type, statisticsWorker);
}
