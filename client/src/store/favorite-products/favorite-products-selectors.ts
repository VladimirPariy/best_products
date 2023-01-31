import { RootState } from "lib/interfaces/store.types";

export const selectFavoriteProducts = (state: RootState) =>
  state.favorite.entities;
