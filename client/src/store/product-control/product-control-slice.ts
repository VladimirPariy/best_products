import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFulfilledDataForRemove } from "lib/interfaces/favorite.interface";
import { IDataForCreating } from "lib/interfaces/products/creating-product.interface";
import { UpdatingProductDetailsInterface } from "lib/interfaces/products/updating-product-details.interface";
import { IUploadImage } from "lib/interfaces/products/upload-image.interface";
import { ErrorPayload } from "lib/interfaces/store.types";

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
    productControlPending: (state) => {
      state.error = null;
      state.status = true;
      state.success = false;
    },
    productControlRejected: (
      state,
      { payload }: PayloadAction<ErrorPayload>
    ) => {
      state.error = payload;
      state.status = false;
      state.success = false;
    },
    clearProductControl: () => {
      return initialState;
    },

    createProductTrigger: (
      _,
      { payload }: PayloadAction<IDataForCreating>
    ) => {},
    createProductFulfilled: (state) => {
      state.error = null;
      state.status = false;
      state.success = true;
    },

    removeProductTrigger: (_, { payload }: PayloadAction<number>) => {},
    removeProductFulfilled: (
      state,
      { payload }: PayloadAction<IFulfilledDataForRemove>
    ) => {
      state.error = null;
      state.status = false;
      state.success = true;
    },

    updateProductTrigger: (
      _,
      { payload }: PayloadAction<UpdatingProductDetailsInterface>
    ) => {},
    updateProductFulfilled: (state) => {
      state.error = null;
      state.status = false;
      state.success = true;
    },

    uploadProductImageTrigger: (_, action: PayloadAction<IUploadImage>) => {},
    uploadProductImageFulfilled: (state) => {
      state.error = null;
      state.status = false;
    },

    removeProductImageTrigger: (_, action: PayloadAction<{ id: number }>) => {},
    removeProductImageFulfilled: (state) => {
      state.status = false;
      state.error = null;
    },
  },
});
