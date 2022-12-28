import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoryWithSubcategory } from "lib/interfaces/categories/categories.interface";
import { ErrorPayload } from "lib/store/store-types";

interface IInitialState {
  categoriesList: ICategoryWithSubcategory[];
  isFetching: boolean;
  error: ErrorPayload | null;
}

const initialState: IInitialState = {
  categoriesList: [],
  error: null,
  isFetching: false,
};

export const categoriesSlice = createSlice({
  name: "@@categories",
  initialState,
  reducers: {
    categoriesFulfilled: (
      state,
      action: PayloadAction<ICategoryWithSubcategory[]>
    ) => {
      state.isFetching = false;
      state.error = null;
      state.categoriesList = action.payload;
    },
    categoriesPending: (state) => {
      state.error = null;
      state.isFetching = true;
      state.categoriesList = [];
    },
    categoriesRejected: (state, action: PayloadAction<ErrorPayload>) => {
      state.error = action.payload;
      state.isFetching = false;
      state.categoriesList = [];
    },
    categoriesTrigger: () => {},
  },
});
