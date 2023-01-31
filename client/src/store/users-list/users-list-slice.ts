import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataForUpdateUserRole } from "lib/interfaces/user-role.interface";
import { IUser } from "lib/interfaces/user/user.interface";
import { ErrorPayload } from "lib/interfaces/store.types";

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
    clearUserList: () => {
      return initialState;
    },

    usersListTrigger: () => {},

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

    usersListFulfilled: (state, action: PayloadAction<IUser[]>) => {
      state.isFetching = false;
      state.error = null;
      state.usersList = action.payload;
    },

    userPending: (state) => {
      state.error = null;
      state.isFetching = true;
    },

    userRejected: (state, { payload }: PayloadAction<ErrorPayload>) => {
      state.error = payload;
      state.isFetching = false;
    },

    changeUserRoleTrigger: (
      _,
      { payload }: PayloadAction<IDataForUpdateUserRole>
    ) => {},

    changeUserRoleFulfilled: (state, { payload }: PayloadAction<IUser>) => {
      state.error = null;
      state.isFetching = false;
      state.usersList = state.usersList.map((item) => {
        if (item.user_id === payload.user_id) {
          item.role = payload.role;
          item.users_roles = payload.users_roles;
        }
        return item;
      });
    },

    removeUserTrigger: (_, { payload }: PayloadAction<number>) => {},

    removeUserFulfilled: (
      state,
      { payload }: PayloadAction<{ userId: number }>
    ) => {
      state.error = null;
      state.isFetching = false;
      state.usersList = state.usersList.filter(
        (item) => item.user_id !== payload.userId
      );
    },
  },
});
