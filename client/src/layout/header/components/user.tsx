import React, { FC, MouseEvent } from "react";

import styles from "layout/header/components/user.module.scss";
import defaultUserImg from "assets/icon/header/user.svg";

import { useScreenWidth } from "lib/hooks/use-screen-width";
import {
  setVisibilityEditUserModal,
  setVisibilityUserModal,
} from "store/modals/modals-actions";
import { selectUserModal } from "store/modals/modals-selectors";
import { selectUser } from "store/user/user-selector";
import { useAppDispatch, useAppSelector } from "store/store-types";

import { apiUrls } from "lib/enums/api-urls";

import UserModal from "layout/header/components/user-modal";

const User: FC = () => {
  const dispatch = useAppDispatch();
  const isShowUserModal = useAppSelector(selectUserModal);

  const userScreenWidth = useScreenWidth();
  const user = useAppSelector(selectUser);

  const showingUserModal = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    userScreenWidth > 768
      ? dispatch(setVisibilityUserModal(!isShowUserModal))
      : dispatch(setVisibilityEditUserModal(true));
  };

  const userImg = user.user_photo
    ? `${apiUrls.BASE_Image_URL}${user.user_photo}`
    : defaultUserImg;

  return (
    <div className={styles.userContainer}>
      <img
        src={userImg}
        alt="user_photo"
        className={styles.userImage}
        onClick={showingUserModal}
      />
      {userScreenWidth > 768 ? null : <UserModal />}
    </div>
  );
};

export default User;
