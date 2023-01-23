import React, { FC } from "react";

import styles from "components/ui/not-logged/not-logged.module.scss";

import {
  setVisibilitySignInModal,
  setVisibilitySignUpModal,
} from "store/modals/modals-actions";
import { useAppDispatch } from "store/store-types";

const NotLogged: FC = () => {
  const dispatch = useAppDispatch();
  const signIn = () => {
    dispatch(setVisibilitySignInModal(true));
  };
  const signUp = () => {
    dispatch(setVisibilitySignUpModal(true));
  };
  return (
    <div className={styles.notLogged}>
      <p>
        You are not
        <span onClick={signUp}> sign up </span>
        or not
        <span onClick={signIn}> sign in </span>
      </p>
    </div>
  );
};

export default NotLogged;
