import { RootState } from "lib/interfaces/store.types";

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
  selectStatisticFavorites,
  selectStatisticPopular,
  selectStatisticRating,
  selectStatisticUsers,
  selectStatisticCommented,
};
