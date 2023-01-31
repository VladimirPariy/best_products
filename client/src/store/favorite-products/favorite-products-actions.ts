import { favoriteProductsSlice } from "store/favorite-products/favorite-products-slice";

export const {
  getFavoriteProductsTrigger,
  getFavoriteProductsPending,
  getFavoriteProductsRejected,
  getFavoriteProductsFulfilled,
  removeFromFavoriteTrigger,
  addIntoFavoriteFulfilled,
  removeFromFavoriteFulfilled,
  addIntoFavoriteTrigger,
  clearFavorite,
  incrementViewFavorite,
  removeProductFromFavoriteList,
  incrementPositiveFeedbackCounterInFavoriteList,
  incrementNegativeFeedbackCounterInFavoriteList,
  updateProductInFavoriteList,
  changeFavoritePending,
  changeFavoriteRejected,
} = favoriteProductsSlice.actions;
