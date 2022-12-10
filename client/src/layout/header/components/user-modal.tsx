import React, {FC, MouseEvent} from "react";

import styles from "layout/header/components/user-modal.module.scss";

interface Props {
  checkedHandler?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowRegistrationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowUserModal?:React.Dispatch<React.SetStateAction<boolean>>;
}

const UserModal: FC<Props> = (props) => {
  const {checkedHandler, setIsShowRegistrationModal,  setIsShowAccountModal,  setIsShowLoginModal,  setIsShowUserModal} = props;
  const isAuth = false
  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    checkedHandler && checkedHandler(false)
  }

  const showAcc = () => {
    setIsShowAccountModal(true)
    setIsShowRegistrationModal(false)
    setIsShowLoginModal(false)
    setIsShowUserModal && setIsShowUserModal(false)
  }

  const showRegistration = () => {
    setIsShowRegistrationModal(true)
    setIsShowLoginModal(false)
    setIsShowAccountModal(false)
    setIsShowUserModal && setIsShowUserModal(false)
  }

  const showLogin = () => {
    setIsShowLoginModal(true)
    setIsShowRegistrationModal(false)
    setIsShowAccountModal(false)
    setIsShowUserModal && setIsShowUserModal(false)
  }

  return (
    <div className={styles.userModal} onClick={clickHandler}>
      {
        isAuth ? <>
            <span onClick={showAcc}>Your name </span>
            <button>Log out</button>
          </> :
          <>
            <div className={styles.registration} onClick={showRegistration}>Registration</div>
            <div className={styles.signIn} onClick={showLogin}>Sign in</div>
          </>
      }
    </div>
  );
};

export default UserModal;
