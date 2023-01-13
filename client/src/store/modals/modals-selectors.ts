import { RootState } from "store/store-types";

const selectSearchModal = (state: RootState) => state.modals.searchModal;
const selectUserModal = (state: RootState) => state.modals.userModal;
const selectSignInModal = (state: RootState) => state.modals.signInModal;
const selectSignUpModal = (state: RootState) => state.modals.signUpModal;
const selectEditUserModal = (state: RootState) => state.modals.editUserModal;

export {
  selectEditUserModal,
  selectSearchModal,
  selectSignInModal,
  selectSignUpModal,
  selectUserModal,
};
