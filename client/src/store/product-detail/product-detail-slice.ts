import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProductDetails } from "lib/interfaces/product-details.interface";
import { IProductImages } from "lib/interfaces/products/upload-image.interface";
import { ErrorPayload } from "lib/interfaces/store.types";

interface IInitialState {
  error: null | ErrorPayload;
  isFetch: boolean;
  productDetail: IProductDetails;
}

const initialState: IInitialState = {
  error: null,
  isFetch: false,
  productDetail: {} as IProductDetails,
};

export const productDetailSlice = createSlice({
  name: "@@product-detail",
  initialState,
  reducers: {
    getProductDetailFulfilled: (
      state,
      { payload }: PayloadAction<IProductDetails>
    ) => {
      state.error = null;
      state.isFetch = false;
      state.productDetail = payload;
    },
    getProductDetailPending: (state) => {
      state.error = null;
      state.isFetch = true;
      state.productDetail = {} as IProductDetails;
    },
    getProductDetailRejected: (
      state,
      { payload }: PayloadAction<ErrorPayload>
    ) => {
      state.error = payload;
      state.isFetch = false;
      state.productDetail = {} as IProductDetails;
    },
    getProductDetailTrigger: (_, action: PayloadAction<number>) => {},

    clearProductDetail: () => {
      return initialState;
    },

    incrementCommentsAmount: (state) => {
      state.productDetail.comments_amount += 1;
    },

    decrementCommentsAmount: (state) => {
      state.productDetail.comments_amount -= 1;
    },

    removeImage: (state, { payload }: PayloadAction<number>) => {
      state.productDetail.product_images =
        state.productDetail.product_images.filter(
          (item) => item.image_id !== payload
        );
    },
    addImage: (state, { payload }: PayloadAction<IProductImages>) => {
      state.productDetail.product_images.push(payload);
    },
  },
});
