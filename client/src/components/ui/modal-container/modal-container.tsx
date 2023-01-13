import React, { FC } from "react";

import { useAppSelector } from "store/store-types";
import {
  selectEditUserModal,
  selectSignInModal,
  selectSignUpModal,
} from "store/modals/modals-selectors";
import RegistrationModal from "components/sign-up-modal/registration-modal";
import SignInModal from "components/sign-in-modal/sign-in-modal";
import UserAccModal from "components/user-acc-modal/user-acc-modal";

const ModalContainer: FC = () => {
  const isShowSignUpModal = useAppSelector(selectSignUpModal);
  const isShwSignInModal = useAppSelector(selectSignInModal);
  const isShowEditUserModal = useAppSelector(selectEditUserModal);

  return (
    <>
      {isShowSignUpModal && <RegistrationModal />}
      {isShwSignInModal && <SignInModal />}
      {isShowEditUserModal && <UserAccModal />}
    </>
  );
};

export default ModalContainer;
