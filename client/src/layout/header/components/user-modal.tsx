import React, { FC, MouseEvent, Dispatch, SetStateAction } from "react";

import styles from "layout/header/components/user-modal.module.scss";

import { IModalScreens } from "lib/interfaces/modal-screens.interface";

interface Props extends IModalScreens {
  setCheckedBurgerMenu?: Dispatch<SetStateAction<boolean>>;
  setIsShowUserModal?: Dispatch<SetStateAction<boolean>>;
}

const UserModal: FC<Props> = (props) => {
  const {
    setCheckedBurgerMenu,
    setIsShowUserModal,
    setIsShowRegistrationModal,
    setIsShowAccountModal,
    setIsShowLoginModal,
  } = props;

  const isAuth = false;

  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setCheckedBurgerMenu && setCheckedBurgerMenu(false);
  };

  const showAcc = () => {
    setIsShowAccountModal(true);
    setIsShowRegistrationModal(false);
    setIsShowLoginModal(false);
    setIsShowUserModal && setIsShowUserModal(false);
  };

  const showRegistration = () => {
    setIsShowRegistrationModal(true);
    setIsShowLoginModal(false);
    setIsShowAccountModal(false);
    setIsShowUserModal && setIsShowUserModal(false);
  };

  const showLogin = () => {
    setIsShowLoginModal(true);
    setIsShowRegistrationModal(false);
    setIsShowAccountModal(false);
    setIsShowUserModal && setIsShowUserModal(false);
  };

  return (
    <div className={styles.userModal} onClick={clickHandler}>
      {isAuth ? (
        <>
          <span onClick={showAcc}>Your name</span>
          <button>Log out</button>
        </>
      ) : (
        <>
          <div className={styles.registration} onClick={showRegistration}>
            Registration
          </div>
          <div className={styles.signIn} onClick={showLogin}>
            Sign in
          </div>
        </>
      )}
    </div>
  );
};

export default UserModal;
