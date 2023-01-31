import React, { FC } from "react";

import { useAppSelector } from "lib/interfaces/store.types";
import {
  selectEditUserModal,
  selectSignInModal,
  selectSignUpModal,
} from "store/modals/modals-selectors";
import SignUpModal from "components/sign-up-modal/sign-up-modal";
import SignInModal from "components/sign-in-modal/sign-in-modal";
import EditUserModal from "components/edit-user-modal/edit-user-modal";

const ModalContainer: FC = () => {
  const isShowSignUpModal = useAppSelector(selectSignUpModal);
  const isShwSignInModal = useAppSelector(selectSignInModal);
  const isShowEditUserModal = useAppSelector(selectEditUserModal);

  return (
    <>
      {isShowSignUpModal && <SignUpModal />}
      {isShwSignInModal && <SignInModal />}
      {isShowEditUserModal && <EditUserModal />}
    </>
  );
};

export default ModalContainer;
