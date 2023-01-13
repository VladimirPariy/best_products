import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  searchModal: boolean;
  signInModal: boolean;
  signUpModal: boolean;
  userModal: boolean;
  editUserModal: boolean;
}

const initialState: IInitialState = {
  editUserModal: false,
  searchModal: false,
  signInModal: false,
  signUpModal: false,
  userModal: false,
};

export const modalsSlice = createSlice({
  name: "@@modal",
  initialState,
  reducers: {
    setVisibilitySearchModal: (state, { payload }: PayloadAction<boolean>) => {
      state.searchModal = payload;
    },
    setVisibilityEditUserModal: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.editUserModal = payload;
    },
    setVisibilitySignInModal: (state, { payload }: PayloadAction<boolean>) => {
      state.signInModal = payload;
    },
    setVisibilitySignUpModal: (state, { payload }: PayloadAction<boolean>) => {
      state.signUpModal = payload;
    },
    setVisibilityUserModal: (state, { payload }: PayloadAction<boolean>) => {
      state.userModal = payload;
    },
  },
});
