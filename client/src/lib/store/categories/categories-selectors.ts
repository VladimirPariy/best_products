import { ICategory } from "lib/interfaces/categories/categories.interface";
import { ErrorPayload, RootState } from "lib/store/store-types";

const categoriesSelector = (state: RootState): ICategory[] =>
  state.categories.categoriesList;
const categoriesErrorSelector = (state: RootState): null | ErrorPayload =>
  state.categories.error;
const categoriesIsFetchingSelector = (state: RootState): boolean =>
  state.categories.isFetching;

export {
  categoriesSelector,
  categoriesErrorSelector,
  categoriesIsFetchingSelector,
};
