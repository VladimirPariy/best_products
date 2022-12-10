import React, {FC} from "react";

import styles from "layout/header/header.module.scss";

import Logo from "layout/header/components/logo";
import Search from "layout/header/components/search";
import User from "layout/header/components/user";
import UserModal from "layout/header/components/user-modal";

interface Props {
  isShowUserModal: boolean;
  setIsShowUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowRegistrationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DesktopHeader: FC<Props> = (props) => {
  const {setIsShowAccountModal, setIsShowLoginModal, setIsShowRegistrationModal, setIsShowUserModal, isShowUserModal} = props
  return (
    <>
      <section className={styles.headerContainer}>
        <Logo/>
        <Search/>
        <User setIsShowUserModal={setIsShowUserModal}
              setIsShowLoginModal={setIsShowLoginModal}
              setIsShowRegistrationModal={setIsShowRegistrationModal}
              setIsShowAccountModal={setIsShowAccountModal}
        />
        {isShowUserModal && <UserModal setIsShowRegistrationModal={setIsShowRegistrationModal}
																			 setIsShowAccountModal={setIsShowAccountModal}
																			 setIsShowLoginModal={setIsShowLoginModal}
																			 setIsShowUserModal={setIsShowUserModal}/>}

      </section>
    </>
  );
};

export default DesktopHeader;