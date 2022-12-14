import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginData } from "lib/interfaces/login-data";
import { IRegistrationData } from "lib/interfaces/registration-data.interface";

import { IUser } from "lib/interfaces/user.interface";
import { ErrorPayload } from "lib/store/store-types";

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
  isFetching: true,
  error: null,
  userInfo: {} as IUser,
};

export const userAuthSlice = createSlice({
  name: "@@user",
  initialState,
  reducers: {
    userAuthFulfilled: (
      state,
      action: PayloadAction<{ user: IUser; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.userInfo = user;
      state.token = token;
      state.isFetching = false;
      state.error = null;
      state.auth = true;
    },
    userAuthPending: (state) => {
      state.isFetching = true;
      state.userInfo = {} as IUser;
      state.token = "";
      state.error = null;
      state.auth = false;
    },
    userAuthRejected: (state, action: PayloadAction<ErrorPayload>) => {
      state.error = action.payload;
      state.userInfo = {} as IUser;
      state.token = "";
      state.isFetching = false;
      state.auth = false;
    },
    userRegistrationTrigger: (
      _,
      action: PayloadAction<IRegistrationData>
    ) => {},
    userLoginTrigger: (_, action: PayloadAction<ILoginData>) => {},
    clearUser: () => {
      return initialState;
    },
  },
});
