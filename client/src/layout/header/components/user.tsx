import UserModal from "layout/header/components/user-modal";
import React, { FC, MouseEvent } from "react";

import { useScreenWidth } from "lib/hooks/use-screen-width";

import styles from "layout/header/components/user.module.scss";
import userImg from "assets/icon/header/user.svg";

interface Props {
  showModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const User: FC<Props> = ({ showModal }) => {
  const userScreenWidth = useScreenWidth();
  const showingUserModal = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    showModal && showModal((prev) => !prev);
  };
  return (
    <div className={styles.userContainer}>
      <img
        src={userImg}
        alt=""
        className={styles.userImage}
        onClick={showingUserModal}
      />
      {userScreenWidth > 768 ? null : <UserModal />}
    </div>
  );
};

export default User;
