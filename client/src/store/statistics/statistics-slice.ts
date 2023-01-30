import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IStatisticsFavorites,
  IStatisticsPopular,
  IStatisticsRating,
  IStatisticsUsers,
  IStatisticsCommented,
} from "lib/interfaces/statistics/statistics.interface";
import { ErrorPayload } from "store/store-types";

interface IInitialState {
  error: null | ErrorPayload;
  status: boolean;
  entities: {
    users: IStatisticsUsers[];
    favorites: IStatisticsFavorites[];
    popular: IStatisticsPopular[];
    rating: IStatisticsRating[];
    commented: IStatisticsCommented[];
  };
}

const initialState: IInitialState = {
  status: false,
  error: null,
  entities: {
    users: [],
    commented: [],
    rating: [],
    popular: [],
    favorites: [],
  },
};

export const statisticsSlice = createSlice({
  name: "@@statistics",
  initialState,
  reducers: {
    clearStatistics: () => {
      return initialState;
    },

    getStatisticsPending: (state) => {
      state.status = true;
      state.error = null;
    },

    getStatisticsRejected: (
      state,
      { payload }: PayloadAction<ErrorPayload>
    ) => {
      state.status = false;
      state.error = payload;
    },
    
    getStatisticsTrigger: () => {},

    getUsersStatisticsFulfilled: (
      state,
      { payload }: PayloadAction<IStatisticsUsers[]>
    ) => {
      state.status = false;
      state.error = null;
      state.entities.users = payload;
    },

    getFavoritesStatisticsFulfilled: (
      state,
      { payload }: PayloadAction<IStatisticsFavorites[]>
    ) => {
      state.error = null;
      state.status = false;
      state.entities.favorites = payload;
    },

    getPopularStatisticsFulfilled: (
      state,
      { payload }: PayloadAction<IStatisticsPopular[]>
    ) => {
      state.error = null;
      state.status = false;
      state.entities.popular = payload;
    },

    getRatingStatisticsFulfilled: (
      state,
      { payload }: PayloadAction<IStatisticsRating[]>
    ) => {
      state.error = null;
      state.status = false;
      state.entities.rating = payload;
    },

    getCommentedStatisticsFulfilled: (
      state,
      { payload }: PayloadAction<IStatisticsCommented[]>
    ) => {
      state.error = null;
      state.status = false;
      state.entities.commented = payload;
    },
  },
});
