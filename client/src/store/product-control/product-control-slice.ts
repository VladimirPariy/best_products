import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataForCreating } from "lib/interfaces/products/creating-product.interface";
import { ErrorPayload } from "store/store-types";

interface IInitialState {
  status: boolean;
  error: null | ErrorPayload;
  success: boolean;
}

const initialState: IInitialState = {
  status: false,
  error: null,
  success: false,
};

export const productControlSlice = createSlice({
  name: "@@product-control",
  initialState,
  reducers: {
    createProductTrigger: (
      _,
      { payload }: PayloadAction<IDataForCreating>
    ) => {},
    createProductPending: (state) => {
      state.error = null;
      state.status = true;
      state.success = false;
    },
    createProductRejected: (
      state,
      { payload }: PayloadAction<ErrorPayload>
    ) => {
      state.error = payload;
      state.status = false;
      state.success = false;
    },
    createProductFulfilled: (state) => {
      state.error = null;
      state.status = false;
      state.success = true;
    },
    clearProductControl: () => {
      return initialState;
    },
  },
});
