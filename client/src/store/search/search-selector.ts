import { RootState } from "lib/interfaces/store.types";

const selectSearchStatus = (state: RootState) => state.search.isLoading;
const selectSearchProductResult = (state: RootState) =>
  state.search.entities.products;
const selectSearchSubcategoriesResult = (state: RootState) =>
  state.search.entities.subcategories;

export {
  selectSearchProductResult,
  selectSearchStatus,
  selectSearchSubcategoriesResult,
};
