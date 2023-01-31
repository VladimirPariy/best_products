import {
  ICategoryWithSubcategory,
  ISubcategory,
} from "lib/interfaces/categories.interface";
import { ErrorPayload, RootState } from "lib/interfaces/store.types";

const selectCategories = (state: RootState): ICategoryWithSubcategory[] =>
  state.categories.categoriesList;
const selectCategoriesError = (state: RootState): null | ErrorPayload =>
  state.categories.error;
const selectCategoriesIsFetching = (state: RootState): boolean =>
  state.categories.isFetching;

const selectSubcategories = (state: RootState) => {
  let subcategory: ISubcategory[] = [];
  state.categories.categoriesList.forEach((category) => {
    subcategory.push(...category.subcategories);
  });
  return subcategory;
};

export {
  selectCategoriesIsFetching,
  selectCategoriesError,
  selectCategories,
  selectSubcategories,
};
