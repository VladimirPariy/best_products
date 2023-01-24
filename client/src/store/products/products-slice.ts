import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IGetProductListTrigger,
  IProduct,
  IProductDataResponse,
} from "lib/interfaces/products/product.interface";
import { IProductDetails } from "lib/interfaces/product-detail/product-details.interface";
import { ErrorPayload } from "store/store-types";

interface IInitialState {
  isFetch: boolean;
  error: ErrorPayload | null;
  productsList: IProduct[];
  currentPage: number;
  totalPage: number;
  orderBy: string | null;
  minPrice: number;
  maxPrice: number;
}

const initialState: IInitialState = {
  isFetch: false,
  error: null,
  productsList: [],
  currentPage: 1,
  totalPage: 0,
  orderBy: null,
  minPrice: 0,
  maxPrice: 0,
};

export const productsSlice = createSlice({
  name: "@@products",
  initialState,
  reducers: {
    productsListFulfilled: (
      state,
      { payload }: PayloadAction<IProductDataResponse>
    ) => {
      state.error = null;
      state.isFetch = false;
      state.currentPage = payload.currentPage;
      if (state.orderBy === payload.orderBy) {
        state.productsList = state.productsList.concat(payload.result);
      } else {
        state.productsList = payload.result;
      }
      state.totalPage = payload.totalPage;
      state.orderBy = payload.orderBy;
      state.maxPrice = payload.maxPrice;
      state.minPrice = payload.minPrice;
    },
    productsListPending: (state) => {
      state.error = null;
      state.isFetch = true;
    },
    productsListRejected: (state, { payload }: PayloadAction<ErrorPayload>) => {
      state.error = payload;
      state.isFetch = false;
    },
    productsListTrigger: (
      state,
      action: PayloadAction<IGetProductListTrigger>
    ) => {},
    clearProductsList: () => {
      return initialState;
    },
    setCurrentPage: (state) => {
      state.currentPage += 1;
    },
    incrementViewCounter: (state, { payload }: PayloadAction<number>) => {
      const product = state.productsList.find(
        (item) => item.product_id === payload
      );
      if (product) product.views_amount += 1;
    },
    incrementPositiveFeedbackCounter: (
      state,
      { payload }: PayloadAction<number>
    ) => {
      const product = state.productsList.find(
        (item) => item.product_id === payload
      );
      if (product) product.positive_feedbacks_amount += 1;
    },
    incrementNegativeFeedbackCounter: (
      state,
      { payload }: PayloadAction<number>
    ) => {
      const product = state.productsList.find(
        (item) => item.product_id === payload
      );
      if (product) product.negative_feedbacks_amount += 1;
    },
    incrementFavoriteCounter: (state, { payload }: PayloadAction<number>) => {
      const product = state.productsList.find(
        (item) => item.product_id === payload
      );
      if (product) product.favorites_amount += 1;
    },
    decrementFavoriteCounter: (state, { payload }: PayloadAction<number>) => {
      const product = state.productsList.find(
        (item) => item.product_id === payload
      );
      if (product) product.favorites_amount -= 1;
    },

    removeProductFulfilled: (state, { payload }: PayloadAction<IProduct[]>) => {
      state.error = null;
      state.isFetch = false;
      state.productsList = payload;
    },
    removeProductPending: (state) => {
      state.error = null;
      state.isFetch = true;
    },
    removeProductRejected: (
      state,
      { payload }: PayloadAction<ErrorPayload>
    ) => {
      state.error = payload;
      state.isFetch = false;
    },
    removeProductTrigger: (_, action: PayloadAction<number>) => {},

    updateProductAction: (
      state,
      { payload }: PayloadAction<IProductDetails>
    ) => {
      // const {
      //   product_id,
      //  characteristics,
      //   product_description,
      //   product_images,
      //   product_title,
      //   price,
      // } = payload;
      // const modifyProduct: IProduct = {
      //   product_id,
      //   characteristics,
      //   product_description,
      //   product_images,
      //   product_title,
      //   price,
      // };
      // return {
      //   ...state,
      //   productsList: [
      //     ...state.productsList.map((prod) => {
      //       if (prod.product_id === product_id) {
      //         return modifyProduct;
      //       } else {
      //         return prod;
      //       }
      //     }),
      //   ],
      // };
    },
  },
});
