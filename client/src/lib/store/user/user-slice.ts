import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILoginData} from "lib/interfaces/login-data";
import {IRegistrationData} from "lib/interfaces/registration-data.interface";
import {IReturningUserData} from "lib/interfaces/returning-user-data";
import {IUserUpdateData} from "lib/interfaces/user-update-data.interface";

import {IUser} from "lib/interfaces/user.interface";
import {ErrorPayload} from "lib/store/store-types";

interface IInitialState {
  auth: boolean;
  token: string;
  isFetching: boolean;
  error: ErrorPayload | null;
  userInfo: IUser;
}

const initialState: IInitialState = {
  auth: false,
  token: "",
  isFetching: false,
  error: null,
  userInfo: {} as IUser,
};

export const userSlice = createSlice({
  name: "@@user",
  initialState,
  reducers: {
    userInfoFulfilled: (
      state,
      action: PayloadAction<IReturningUserData>
    ) => {
      const {user, token} = action.payload;
      state.userInfo = user;
      state.token = token;
      state.isFetching = false;
      state.error = null;
      state.auth = true;
    },
    userInfoPending: (state) => {
      state.isFetching = true;
      state.userInfo = {} as IUser;
      state.token = "";
      state.error = null;
      state.auth = false;
    },
    userInfoRejected: (state, action: PayloadAction<ErrorPayload>) => {
      state.error = action.payload;
      state.userInfo = {} as IUser;
      state.token = "";
      state.isFetching = false;
      state.auth = false;
    },
    updateUserFulfilled: (state, action: PayloadAction<IReturningUserData>) => {
      const {user, token} = action.payload;
      state.userInfo = user;
      state.token = token;
    },
    updateUserPending: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    updateUserReject: (state, {payload}: PayloadAction<ErrorPayload>) => {
      state.isFetching = false;
      state.error = payload;
    },

    userRegistrationTrigger: (
      _,
      action: PayloadAction<IRegistrationData>
    ) => {
    },
    userLoginTrigger: (_, action: PayloadAction<ILoginData>) => {
    },
    userUpdateTrigger: (_, action: PayloadAction<IUserUpdateData>) => {
    },
    clearUser: () => {
      return initialState;
    },
  },
});
