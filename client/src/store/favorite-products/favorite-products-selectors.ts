import { RootState } from "store/store-types";

const selectFavoriteProducts = (state: RootState) => state.favorite.entities;
const selectFavoriteProductsStatus = (state: RootState) =>
  state.favorite.status;
const selectFavoriteProductsError = (state: RootState) => state.favorite.error;

export {
  selectFavoriteProducts,
  selectFavoriteProductsError,
  selectFavoriteProductsStatus,
};
