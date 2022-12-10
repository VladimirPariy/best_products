import React, { FC, MouseEvent, Dispatch, SetStateAction } from "react";

import styles from "layout/header/components/user.module.scss";

import userImg from "assets/icon/header/user.svg";
import UserModal from "layout/header/components/user-modal";
import { useScreenWidth } from "lib/hooks/use-screen-width";
import { IModalScreens } from "lib/interfaces/modal-screens.interface";

interface Props extends IModalScreens {
  setCheckedBurgerMenu?: Dispatch<SetStateAction<boolean>>;
  setIsShowUserModal?: Dispatch<SetStateAction<boolean>>;
}

const User: FC<Props> = (props) => {
  const { setIsShowUserModal, setCheckedBurgerMenu, ...setIsShowModals } =
    props;

  const userScreenWidth = useScreenWidth();

  const showingUserModal = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    userScreenWidth > 768 && setIsShowUserModal
      ? setIsShowUserModal((prev) => !prev)
      : setIsShowModals.setIsShowAccountModal(true);
  };

  return (
    <div className={styles.userContainer}>
      <img
        src={userImg}
        alt="user_photo"
        className={styles.userImage}
        onClick={showingUserModal}
      />
      {userScreenWidth > 768 ? null : (
        <UserModal
          setIsShowUserModal={setIsShowUserModal}
          setCheckedBurgerMenu={setCheckedBurgerMenu}
          {...setIsShowModals}
        />
      )}
    </div>
  );
};

export default User;
