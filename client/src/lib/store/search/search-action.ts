import { searchSlice } from "lib/store/search/search-slice";

export const {
  searchFulfilled,
  searchRejected,
  searchPending,
  searchTrigger,
  clearSearchState,
} = searchSlice.actions;
