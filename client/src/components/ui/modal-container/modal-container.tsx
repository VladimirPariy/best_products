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

  let modal: JSX.Element | null;
  switch (true) {
    case isShowSignUpModal:
      modal = <SignUpModal />;
      break;
    case isShwSignInModal:
      modal = <SignInModal />;
      break;
    case isShowEditUserModal:
      modal = <EditUserModal />;
      break;
    default:
      modal = null;
  }

  return modal;
};

export default ModalContainer;
