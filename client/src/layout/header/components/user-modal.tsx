import React, {FC, MouseEvent, Dispatch, SetStateAction} from "react";

import styles from "layout/header/components/user-modal.module.scss";

import {useAppDispatch, useAppSelector} from "lib/store/store-types";
import {selectAuth, selectUser} from "lib/store/user/user-selector";
import {clearUser} from "lib/store/user/user-actions";

import {IModalScreens} from "lib/interfaces/modal-screens.interface";

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

  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);

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

  const logOutHandler = () => {
    dispatch(clearUser());
    setIsShowAccountModal(false);
  };

  return (
    <div className={styles.userModal} onClick={clickHandler}>
      {isAuth ? (
        <>
          <span onClick={showAcc}>
            {user.first_name} {user.last_name}
          </span>
          <button onClick={logOutHandler}>Log out</button>
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
