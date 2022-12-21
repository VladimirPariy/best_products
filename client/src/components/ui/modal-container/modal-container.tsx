import RegistrationModal from "components/registration-modal/registration-modal";
import SignInModal from "components/sign-in-modal/sign-in-modal";
import UserAccModal from "components/user-acc-modal/user-acc-modal";
import {IModalScreens} from "lib/interfaces/modal-screens.interface";
import React, {FC} from "react";

interface Props extends IModalScreens {
  isShowRegistrationModal: boolean;
  isShowLoginModal: boolean;
  isShowAccountModal: boolean;
}

const ModalContainer: FC<Props> = (props) => {
  const {isShowRegistrationModal, isShowLoginModal, isShowAccountModal, setIsShowAccountModal, setIsShowLoginModal, setIsShowRegistrationModal} = props;
  return (
    <>
      {isShowRegistrationModal && (
        <RegistrationModal
          setIsShowRegistrationModal={setIsShowRegistrationModal}
          isShowRegistrationModal={isShowRegistrationModal}
        />
      )}
      {isShowLoginModal && (
        <SignInModal
          isShowLoginModal={isShowLoginModal}
          setIsShowLoginModal={setIsShowLoginModal}
          setIsShowRegistrationModal={setIsShowRegistrationModal}
        />
      )}
      {isShowAccountModal && (
        <UserAccModal
          setIsShowAccountModal={setIsShowAccountModal}
          isShowAccountModal={isShowAccountModal}
        />
      )}
    </>
  );
};

export default ModalContainer;