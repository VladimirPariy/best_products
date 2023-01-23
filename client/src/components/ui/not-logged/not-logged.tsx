import React, { FC } from "react";
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
    <div>
      <p>
        You are not
        <span onClick={signUp}> registered </span>
        or not
        <span onClick={signIn}> logged </span>
      </p>
    </div>
  );
};

export default NotLogged;
