import { RootState } from "store/store-types";

const selectStatisticStatus = (state: RootState) => state.statistics.status;
const selectStatisticError = (state: RootState) => state.statistics.error;
const selectStatisticFavorites = (state: RootState) =>
  state.statistics.entities.favorites;
const selectStatisticPopular = (state: RootState) =>
  state.statistics.entities.popular;
const selectStatisticRating = (state: RootState) =>
  state.statistics.entities.rating;
const selectStatisticUsers = (state: RootState) =>
  state.statistics.entities.users;
const selectStatisticCommented = (state: RootState) =>
  state.statistics.entities.commented;

export {
  selectStatisticStatus,
  selectStatisticError,
  selectStatisticFavorites,
  selectStatisticPopular,
  selectStatisticRating,
  selectStatisticUsers,
  selectStatisticCommented,
};
