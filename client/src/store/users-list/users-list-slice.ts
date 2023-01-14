import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "lib/interfaces/user/user";
import { ErrorPayload } from "store/store-types";

interface IInitialState {
  isFetching: boolean;
  error: null | ErrorPayload;
  usersList: IUser[];
}

const initialState: IInitialState = {
  isFetching: false,
  error: null,
  usersList: [],
};

export const usersListSlice = createSlice({
  name: "@@users-list",
  initialState,
  reducers: {
    usersListFulfilled: (state, action: PayloadAction<IUser[]>) => {
      state.isFetching = false;
      state.error = null;
      state.usersList = action.payload;
    },
    usersListPending: (state) => {
      state.isFetching = true;
      state.error = null;
      state.usersList = [];
    },
    usersListRejected: (state, action: PayloadAction<ErrorPayload>) => {
      state.isFetching = false;
      state.error = action.payload;
      state.usersList = [];
    },
    usersListTrigger: () => {},
  },
});
