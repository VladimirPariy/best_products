import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "lib/interfaces/products/product";
import {IProductDetails} from "lib/interfaces/products/product-details";
import {ErrorPayload} from "lib/store/store-types";

interface IInitialState {
  isFetch: boolean;
  error: ErrorPayload | null;
  productsList: IProduct[];
}

const initialState: IInitialState = {
  isFetch: false,
  error: null,
  productsList: [],
};

export const productsSlice = createSlice({
  name: "@@products",
  initialState,
  reducers: {
    productsListFulfilled: (state, {payload}: PayloadAction<IProduct[]>) => {
      state.error = null;
      state.isFetch = false;
      state.productsList = payload;
    },
    productsListPending: (state) => {
      state.error = null;
      state.isFetch = true;
      state.productsList = [];
    },
    productsListRejected: (state, {payload}: PayloadAction<ErrorPayload>) => {
      state.error = payload;
      state.isFetch = false;
      state.productsList = [];
    },
    productsListTrigger: () => {
    },

    removeProductFulfilled: (state, {payload}: PayloadAction<IProduct[]>) => {
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
      {payload}: PayloadAction<ErrorPayload>
    ) => {
      state.error = payload;
      state.isFetch = false;
    },
    removeProductTrigger: (_, action: PayloadAction<number>) => {
    },

    clearProductsList: (state) => {
      state = initialState;
    },
    addNewProduct: (state, {payload}: PayloadAction<IProduct>) => {
      state.productsList.push(payload);
    },
    updateProductAction: (state, {payload}: PayloadAction<IProductDetails>) => {
      const {product_id, product_characteristics, product_description, product_images, product_title, price} = payload;
      const modifyProduct: IProduct = {product_id, product_characteristics, product_description, product_images, product_title, price};

      return {
        ...state, productsList: [...state.productsList.map(prod => {
          if (prod.product_id === product_id) {
            return modifyProduct
          } else {
            return prod
          }
        })]
      }
    }
  },
});
