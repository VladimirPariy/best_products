import React, { FC, MouseEvent, Dispatch, SetStateAction } from "react";

import styles from "layout/header/components/user.module.scss";
import defaultUserImg from "assets/icon/header/user.svg";

import { useScreenWidth } from "lib/hooks/use-screen-width";

import { selectUser } from "lib/store/user/user-selector";
import { useAppSelector } from "lib/store/store-types";

import { apiUrls } from "lib/enums/api-urls";

import { IModalScreens } from "lib/interfaces/modal-screens.interface";

import UserModal from "layout/header/components/user-modal";

interface Props extends IModalScreens {
  setCheckedBurgerMenu?: Dispatch<SetStateAction<boolean>>;
  setIsShowUserModal?: Dispatch<SetStateAction<boolean>>;
}

const User: FC<Props> = (props) => {
  const { setIsShowUserModal, setCheckedBurgerMenu, ...setIsShowModals } =
    props;

  const userScreenWidth = useScreenWidth();
  const user = useAppSelector(selectUser);

  const showingUserModal = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    userScreenWidth > 768 && setIsShowUserModal
      ? setIsShowUserModal((prev) => !prev)
      : setIsShowModals.setIsShowAccountModal(true);
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
