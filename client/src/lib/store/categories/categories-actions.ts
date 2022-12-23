import { categoriesSlice } from "lib/store/categories/categories-slice";

export const {
  categoriesPending,
  categoriesFulfilled,
  categoriesTrigger,
  categoriesRejected,
} = categoriesSlice.actions;
