import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IProductDetails} from "lib/interfaces/product-detail/product-details.interface";
import {
  IProductImages,
  IUploadImage,
} from "lib/interfaces/products/upload-image.interface";
import {ErrorPayload} from "store/store-types";

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
      {payload}: PayloadAction<IProductDetails>
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
      {payload}: PayloadAction<ErrorPayload>
    ) => {
      state.error = payload;
      state.isFetch = false;
      state.productDetail = {} as IProductDetails;
    },
    getProductDetailTrigger: (_, action: PayloadAction<number>) => {
    },

    clearProductDetail: () => {
      return initialState;
    },

    incrementCommentsAmount: (state) => {
      state.productDetail.comments_amount += 1
    },

    decrementCommentsAmount: (state) => {
      state.productDetail.comments_amount -= 1
    },


    uploadProductImageFulfilled: (
      state,
      {payload}: PayloadAction<IProductImages>
    ) => {
      state.error = null;
      state.isFetch = false;
      state.productDetail.product_images.push(payload);
    },
    uploadProductImagePending: (state) => {
      state.error = null;
      state.isFetch = true;
    },
    uploadProductImageRejected: (
      state,
      {payload}: PayloadAction<ErrorPayload>
    ) => {
      state.error = payload;
      state.isFetch = false;
    },
    uploadProductImageTrigger: (_, action: PayloadAction<IUploadImage>) => {
    },
    removeProductImageFulfilled: (
      state,
      {payload}: PayloadAction<number>
    ) => {
      state.isFetch = false;
      state.error = null;
      state.productDetail.product_images =
        state.productDetail.product_images.filter(
          (img) => img.image_id !== payload
        );
    },
    removeProductImagePending: (state) => {
      state.isFetch = true;
      state.error = null;
    },
    removeProductImageRejected: (
      state,
      {payload}: PayloadAction<ErrorPayload>
    ) => {
      state.isFetch = false;
      state.error = payload;
    },
    removeProductImageTrigger: (_, action: PayloadAction<{ id: number }>) => {
    },
  },
});
