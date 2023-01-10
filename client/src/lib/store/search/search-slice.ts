import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISearchData} from "lib/interfaces/search/search.interface";
import {ErrorPayload} from "lib/store/store-types";

interface IInitialState {
  entities: ISearchData;
  error: null | ErrorPayload;
  isLoading: boolean;
}

const initialState: IInitialState = {
  entities: {
    products: [],
    subcategories: []
  },
  error: null,
  isLoading: false
};

export const searchSlice = createSlice({
  name: '@@search',
  initialState,
  reducers: {
    clearSearchState: () => {
      return initialState;
    },
    searchTrigger: (_, action: PayloadAction<string>) => {
    },
    searchPending: (state) => {
      state.isLoading = true;
      state.error = null;
      state.entities = initialState.entities;
    },
    searchRejected: (state, {payload}: PayloadAction<ErrorPayload>) => {
      state.isLoading = false;
      state.entities = initialState.entities;
      state.error = payload;
    },
    searchFulfilled: (state, {payload}: PayloadAction<ISearchData>) => {
      state.isLoading = false;
      state.error = null;
      state.entities = payload;
    }
  }
})