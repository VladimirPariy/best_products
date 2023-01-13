import { RootState } from "store/store-types";

const selectSearchStatus = (state: RootState) => state.search.isLoading;
const selectSearchError = (state: RootState) => state.search.error;
const selectSearchResult = (state: RootState) => state.search.entities;

const selectSearchProductResult = (state: RootState) =>
  state.search.entities.products;
const selectSearchSubcategoriesResult = (state: RootState) =>
  state.search.entities.subcategories;

export {
  selectSearchError,
  selectSearchResult,
  selectSearchProductResult,
  selectSearchStatus,
  selectSearchSubcategoriesResult,
};
