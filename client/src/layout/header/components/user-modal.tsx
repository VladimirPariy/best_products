import React, { FC, MouseEvent, Dispatch, SetStateAction } from "react";

import styles from "layout/header/components/user-modal.module.scss";

import { deleteTokenFromStorage } from "lib/utils/token-from-storage";
import { useAppDispatch, useAppSelector } from "store/store-types";
import { selectAuth, selectUser } from "store/user/user-selector";
import { clearUser } from "store/user/user-actions";
import {
  setVisibilityBurgerMenu,
  setVisibilityEditUserModal,
  setVisibilitySignInModal,
  setVisibilitySignUpModal,
  setVisibilityUserModal,
} from "store/modals/modals-actions";

interface Props {
  setCheckedBurgerMenu?: Dispatch<SetStateAction<boolean>>;
}

const UserModal: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);

  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(setVisibilityBurgerMenu(false));
  };

  const showAcc = () => {
    dispatch(setVisibilityEditUserModal(true));
    dispatch(setVisibilitySignInModal(false));
    dispatch(setVisibilitySignUpModal(false));
    dispatch(setVisibilityUserModal(false));
  };

  const showRegistration = () => {
    dispatch(setVisibilityEditUserModal(false));
    dispatch(setVisibilitySignInModal(false));
    dispatch(setVisibilitySignUpModal(true));
    dispatch(setVisibilityUserModal(false));
  };

  const showLogin = () => {
    dispatch(setVisibilityEditUserModal(false));
    dispatch(setVisibilitySignInModal(true));
    dispatch(setVisibilitySignUpModal(false));
    dispatch(setVisibilityUserModal(false));
  };

  const logOutHandler = () => {
    dispatch(clearUser());
    deleteTokenFromStorage();
    dispatch(setVisibilityEditUserModal(false));
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
