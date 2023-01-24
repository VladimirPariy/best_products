import { favoriteProductsSlice } from "store/favorite-products/favorite-products-slice";

export const {
  getFavoriteProductsTrigger,
  getFavoriteProductsPending,
  getFavoriteProductsRejected,
  getFavoriteProductsFulfilled,
  removeFromFavoriteTrigger,
  addIntoFavoriteFulfilled,
  addIntoFavoriteRejected,
  removeFromFavoriteFulfilled,
  removeFromFavoritePending,
  removeFromFavoriteRejected,
  addIntoFavoriteTrigger,
  addIntoFavoritePending,
  clearFavorite,
  incrementViewFavorite,
  removeProductFromFavoriteList,
} = favoriteProductsSlice.actions;
