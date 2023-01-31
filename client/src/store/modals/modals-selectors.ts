import { RootState } from "lib/interfaces/store.types";

const selectSearchModal = (state: RootState) => state.modals.searchModal;
const selectUserModal = (state: RootState) => state.modals.userModal;
const selectSignInModal = (state: RootState) => state.modals.signInModal;
const selectSignUpModal = (state: RootState) => state.modals.signUpModal;
const selectEditUserModal = (state: RootState) => state.modals.editUserModal;
const selectBurgerMenu = (state: RootState) => state.modals.burgerMenu;
const selectModal = (state: RootState) => state.modals;

export {
  selectEditUserModal,
  selectSearchModal,
  selectSignInModal,
  selectSignUpModal,
  selectUserModal,
  selectBurgerMenu,
  selectModal,
};
