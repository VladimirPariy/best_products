import { modalsSlice } from "store/modals/modals-slice";

export const {
  setVisibilityUserModal,
  setVisibilitySearchModal,
  setVisibilitySignInModal,
  setVisibilitySignUpModal,
  setVisibilityEditUserModal,
  clearModal,
  setVisibilityBurgerMenu,
} = modalsSlice.actions;
