import { createSlice } from "@reduxjs/toolkit";
import { IRole } from "lib/interfaces/user-interfaces/user";
import { ErrorPayload } from "lib/store/store-types";

interface IInitialState {
  rolesList: IRole[];
  isFetch: boolean;
  error: ErrorPayload | null;
}

const initialState: IInitialState = {
  isFetch: false,
  error: null,
  rolesList: [],
};

export const usersRolesSlice = createSlice({
  name: "@@users-roles",
  initialState,
  reducers: {
    usersRolesFulfilled: (state, action) => {
      state.error = null;
      state.isFetch = false;
      state.rolesList = action.payload;
    },
    usersRolesPending: (state) => {
      state.error = null;
      state.isFetch = true;
      state.rolesList = [];
    },
    usersRolesRejected: (state, action) => {
      state.error = action.payload;
      state.isFetch = false;
      state.rolesList = [];
    },
    usersRolesTrigger: () => {},
  },
});
