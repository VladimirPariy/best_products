import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IProduct} from "lib/interfaces/products/product";
import {UpdatingProductDetails} from "lib/interfaces/products/updating-product-details";
import {IProductImages, IUploadImage} from "lib/interfaces/products/upload-image";
import {ErrorPayload} from "lib/store/store-types";

interface IInitialState {
  error: null | ErrorPayload;
  isFetch: boolean;
  productDetail: IProduct;
}

const initialState: IInitialState = {
  error: null,
  isFetch: false,
  productDetail: {} as IProduct
}


export const productDetailSlice = createSlice({
  name: "@@product-detail",
  initialState,
  reducers: {
    getProductDetailFulfilled: (state, {payload}: PayloadAction<IProduct>) => {
      state.error = null;
      state.isFetch = false;
      state.productDetail = payload;
    },
    getProductDetailPending: (state) => {
      state.error = null;
      state.isFetch = true;
      state.productDetail = {} as IProduct;
    },
    getProductDetailRejected: (state, {payload}: PayloadAction<ErrorPayload>) => {
      state.error = payload;
      state.isFetch = false;
      state.productDetail = {} as IProduct;
    },
    getProductDetailTrigger: (_, action: PayloadAction<{ id: number }>) => {
    },

    clearProductDetail: () => {
      return initialState;
    },

    uploadProductImageFulfilled: (state, {payload}: PayloadAction<IProductImages>) => {
      state.error = null;
      state.isFetch = false;
      state.productDetail.product_images.push(payload)
    },
    uploadProductImagePending: (state) => {
      state.error = null;
      state.isFetch = true;
    },
    uploadProductImageRejected: (state, {payload}: PayloadAction<ErrorPayload>) => {
      state.error = payload;
      state.isFetch = false;
    },
    uploadProductImageTrigger: (_, action: PayloadAction<IUploadImage>) => {

    },
    removeProductImageFulfilled: (state, {payload}: PayloadAction<number>) => {
      state.isFetch = false;
      state.error = null;
      state.productDetail.product_images = state.productDetail.product_images.filter(img => img.image_id !== payload)
    },
    removeProductImagePending: (state) => {
      state.isFetch = true;
      state.error = null;
    },
    removeProductImageRejected: (state, {payload}: PayloadAction<ErrorPayload>) => {
      state.isFetch = false;
      state.error = payload;
    },
    removeProductImageTrigger: (_, action: PayloadAction<{ id: number }>) => {
    },

    updateProductDetailFulfilled: (state, {payload}: PayloadAction<IProduct>) => {
      state.error = null;
      state.isFetch = false;
      state.productDetail = payload;
    },
    updateProductDetailPending: (state) => {
      state.error = null;
      state.isFetch = true;
    },
    updateProductDetailRejected: (state, {payload}: PayloadAction<ErrorPayload>) => {
      state.error = payload;
      state.isFetch = false;
    },
    updateProductDetailTrigger: (_, action: PayloadAction<UpdatingProductDetails>) => {
    },


  }
})