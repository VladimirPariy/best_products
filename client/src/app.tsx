import { useAppDispatch, useAppSelector } from "store/store-types";
import React, { FC } from "react";

import Header from "layout/header/header";
import Content from "layout/content/content";

import {
  setVisibilityEditUserModal,
  setVisibilitySearchModal,
  setVisibilitySignInModal,
  setVisibilitySignUpModal,
  setVisibilityUserModal,
} from "store/modals/modals-actions";
import {
  selectEditUserModal,
  selectSearchModal,
  selectSignInModal,
  selectSignUpModal,
  selectUserModal,
} from "store/modals/modals-selectors";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isShowSearchModal = useAppSelector(selectSearchModal);
  const isShowUserModal = useAppSelector(selectUserModal);
  const isShowSignUpModal = useAppSelector(selectSignUpModal);
  const isShowSignInModal = useAppSelector(selectSignInModal);
  const isShowEditUserModal = useAppSelector(selectEditUserModal);

  const mainClickHandler = () => {
    isShowUserModal && dispatch(setVisibilityUserModal(false));
    isShowSignUpModal && dispatch(setVisibilitySignUpModal(false));
    isShowSignInModal && dispatch(setVisibilitySignInModal(false));
    isShowEditUserModal && dispatch(setVisibilityEditUserModal(false));
    isShowSearchModal && dispatch(setVisibilitySearchModal(false));
  };

  return (
    <main onClick={mainClickHandler}>
      <Header />
      <Content />
    </main>
  );
};

export default App;
