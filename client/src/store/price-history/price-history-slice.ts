import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShotPriceHistory } from "lib/interfaces/price-history/price-history.interface";
import { ErrorPayload } from "store/store-types";

interface IInitialState {
  status: boolean;
  error: null | ErrorPayload;
  entities: IShotPriceHistory[];
}

const initialState: IInitialState = {
  status: false,
  error: null,
  entities: [],
};

export const priceHistorySlice = createSlice({
  name: "@@price-history",
  initialState,
  reducers: {
    getPriceHistoryTrigger: (_, { payload }: PayloadAction<number>) => {},
    getPriceHistoryPending: (state) => {
      state.error = null;
      state.status = true;
      state.entities = [];
    },
    getPriceHistoryFulfilled: (
      state,
      { payload }: PayloadAction<IShotPriceHistory[]>
    ) => {
      state.error = null;
      state.status = false;
      state.entities = payload;
    },
    getPriceHistoryRejected: (
      state,
      { payload }: PayloadAction<ErrorPayload>
    ) => {
      state.error = payload;
      state.status = false;
      state.entities = [];
    },
    clearPriceHistory: () => {
      return initialState;
    },
  },
});
