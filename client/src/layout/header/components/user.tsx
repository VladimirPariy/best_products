import UserModal from "layout/header/components/user-modal";
import React, {FC, MouseEvent} from "react";

import {useScreenWidth} from "lib/hooks/use-screen-width";

import styles from "layout/header/components/user.module.scss";
import userImg from "assets/icon/header/user.svg";

interface Props {
  checkedHandler?: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckedBurgerMenu?:React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowUserModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowRegistrationModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const User: FC<Props> = (props) => {
  const {setIsShowUserModal, setIsShowRegistrationModal, setIsShowAccountModal,  setIsShowLoginModal, checkedHandler} = props;

  const userScreenWidth = useScreenWidth();
  const showingUserModal = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setIsShowUserModal && setIsShowUserModal((prev) => !prev);
  };
  return (
    <div className={styles.userContainer}>
      <img
        src={userImg}
        alt=""
        className={styles.userImage}
        onClick={showingUserModal}
      />
      {userScreenWidth > 768 ? null : <UserModal checkedHandler={checkedHandler} setIsShowRegistrationModal={setIsShowRegistrationModal} setIsShowAccountModal={setIsShowAccountModal}   setIsShowLoginModal={setIsShowLoginModal}  setIsShowUserModal={setIsShowUserModal}/>}
    </div>
  );
};

export default User;
