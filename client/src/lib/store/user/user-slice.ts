import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILoginData} from "lib/interfaces/user-interfaces/login-data";

import {IRegistrationData} from "lib/interfaces/user-interfaces/registration-data";
import {TokenType} from "lib/interfaces/user-interfaces/token";
import {IUserUpdateData} from "lib/interfaces/user-interfaces/user-update-data.interface";

import {IUser} from "lib/interfaces/user-interfaces/user";
import {ErrorPayload} from "lib/store/store-types";
import {deleteTokenFromStorage} from "lib/utils/TokenFromStorage";
import {act} from "react-dom/test-utils";

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
    userTokenFulfilled: (state, action: PayloadAction<TokenType>) => {
      state.token = action.payload;
      state.isFetching = false;
      state.error = null;
    },
    userTokenPending: (state) => {
      state.isFetching = true;
      state.token = "";
      state.error = null;
    },
    userTokenRejected: (state, action: PayloadAction<ErrorPayload>) => {
      state.error = action.payload;
      state.isFetching = false;
      state.token = "";
    },
    userTokenTrigger: (
      _,
      action: PayloadAction<IRegistrationData | ILoginData>
    ) => {
    },

    userInfoFulfilled: (state, action: PayloadAction<IUser>) => {
      state.userInfo = action.payload;
      state.isFetching = false;
      state.error = null;
      state.auth = true;
    },
    userInfoPending: (state) => {
      state.isFetching = true;
      state.userInfo = {} as IUser;
      state.error = null;
      state.auth = false;
    },
    userInfoRejected: (state, action: PayloadAction<ErrorPayload>) => {
      state.error = action.payload;
      state.userInfo = {} as IUser;
      state.isFetching = false;
      state.auth = false;
      deleteTokenFromStorage();
    },
    userInfoTrigger: (_, action: PayloadAction<TokenType>) => {
    },

    updateUserFulfilled: (
      state,
      action: PayloadAction<{ user: IUser; token: string }>
    ) => {
      const {user, token} = action.payload;
      state.userInfo = user;
      state.token = token;
      state.isFetching = false;
      state.error = null;
    },
    updateUserPending: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    updateUserReject: (state, {payload}: PayloadAction<ErrorPayload>) => {
      state.isFetching = false;
      state.error = payload;
    },
    userUpdateTrigger: (_, action: PayloadAction<IUserUpdateData>) => {
    },

    clearUser: () => {
      return initialState;
    },
  },
});
