import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  IDataForChangeFavorite,
  IFulfilledDataForRemoveFavorite,
} from "lib/interfaces/favorite/favorite.interface";
import { IProduct } from "lib/interfaces/products/product.interface";
import { ErrorPayload } from "store/store-types";

interface IInitialState {
  status: boolean;
  error: null | ErrorPayload;
  entities: IProduct[];
}

const initialState: IInitialState = {
  status: false,
  error: null,
  entities: [],
};

export const favoriteProductsSlice = createSlice({
  name: "@@favorite",
  initialState,
  reducers: {
    getFavoriteProductsTrigger: (_, { payload }: PayloadAction<number>) => {},
    getFavoriteProductsPending: (state) => {
      state.error = null;
      state.status = true;
      state.entities = [];
    },
    getFavoriteProductsFulfilled: (
      state,
      { payload }: PayloadAction<IProduct[]>
    ) => {
      state.error = null;
      state.status = false;
      state.entities = payload;
    },
    getFavoriteProductsRejected: (
      state,
      { payload }: PayloadAction<ErrorPayload>
    ) => {
      state.error = payload;
      state.status = false;
      state.entities = [];
    },

    addIntoFavoriteTrigger: (
      _,
      { payload }: PayloadAction<IDataForChangeFavorite>
    ) => {},
    addIntoFavoritePending: (state) => {
      state.error = null;
      state.status = true;
    },
    addIntoFavoriteRejected: (
      state,
      { payload }: PayloadAction<ErrorPayload>
    ) => {
      state.status = false;
      state.error = payload;
    },
    addIntoFavoriteFulfilled: (state, { payload }: PayloadAction<IProduct>) => {
      state.error = null;
      state.status = false;
      state.entities = state.entities.concat(payload);
    },

    removeFromFavoriteTrigger: (
      _,
      { payload }: PayloadAction<IDataForChangeFavorite>
    ) => {},
    removeFromFavoritePending: (state) => {
      state.error = null;
      state.status = true;
    },
    removeFromFavoriteRejected: (
      state,
      { payload }: PayloadAction<ErrorPayload>
    ) => {
      state.error = payload;
      state.status = false;
    },
    removeFromFavoriteFulfilled: (
      state,
      { payload }: PayloadAction<IFulfilledDataForRemoveFavorite>
    ) => {
      state.error = null;
      state.status = false;
      state.entities = state.entities.filter(
        (item) => item.product_id !== payload.productId
      );
    },

    clearFavorite: () => {
      return initialState;
    },
    incrementViewFavorite: (state, { payload }: PayloadAction<number>) => {
      const product = state.entities.find(
        (item) => item.product_id === payload
      );
      if (product) product.views_amount += 1;
    },
  },
});
