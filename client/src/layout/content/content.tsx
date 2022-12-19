import React, {FC, useEffect} from "react";

import styles from "layout/content/content.module.scss";

import {useAppDispatch, useAppSelector} from "lib/store/store-types";
import {userInfoTrigger} from "lib/store/user/user-actions";
import {selectAuth} from "lib/store/user/user-selector";
import {getTokenFromStorage} from "lib/utils/TokenFromStorage";

import {IModalScreens} from "lib/interfaces/modal-screens.interface";

import {useScreenWidth} from "lib/hooks/use-screen-width";

import Sidebar from "components/sidebar/sidebar";
import AppRouter from "components/app-router/app-router";
import RegistrationModal from "components/registration-modal/registration-modal";
import SignInModal from "components/sign-in-modal/sign-in-modal";
import UserAccModal from "components/user-acc-modal/user-acc-modal";

interface Props extends IModalScreens {
  isShowRegistrationModal: boolean;
  isShowLoginModal: boolean;
  isShowAccountModal: boolean;
}

const Content: FC<Props> = (props) => {
  const {
    isShowRegistrationModal,
    setIsShowRegistrationModal,
    isShowLoginModal,
    setIsShowLoginModal,
    isShowAccountModal,
    setIsShowAccountModal,
  } = props;

  const dispatch = useAppDispatch();
  const token = getTokenFromStorage();
  const auth = useAppSelector(selectAuth);

  useEffect(() => {
    if (token && !auth) {
      dispatch(userInfoTrigger(token));
    }
  }, [token]);

  const userScreenWidth = useScreenWidth();
  return (
    <div className={styles.mainWrapper}>
      {userScreenWidth <= 768 ? null : <Sidebar/>}
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
      <AppRouter/>
    </div>
  );
};

export default Content;
