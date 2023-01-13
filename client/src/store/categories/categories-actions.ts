import { categoriesSlice } from "store/categories/categories-slice";

export const {
  categoriesPending,
  categoriesFulfilled,
  categoriesTrigger,
  categoriesRejected,
} = categoriesSlice.actions;
