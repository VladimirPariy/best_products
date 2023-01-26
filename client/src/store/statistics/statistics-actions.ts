import { statisticsSlice } from "store/statistics/statistics-slice";

export const {
  clearStatistics,
  getStatisticsPending,
  getStatisticsRejected,
  getUsersStatisticsFulfilled,
  getCommentedStatisticsFulfilled,
  getFavoritesStatisticsFulfilled,
  getPopularStatisticsFulfilled,
  getRatingStatisticsFulfilled,
  getStatisticsTrigger,
} = statisticsSlice.actions;
