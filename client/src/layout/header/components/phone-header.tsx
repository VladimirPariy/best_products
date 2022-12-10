import Sidebar from "components/sidebar/sidebar";
import BurgerMenu from "layout/header/components/burger-menu";
import Logo from "layout/header/components/logo";
import Search from "layout/header/components/search";
import User from "layout/header/components/user";
import styles from "layout/header/header.module.scss";
import React, {FC} from "react";

interface Props {
  checkedBurgerMenu: boolean;
  setCheckedBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>
  setIsShowRegistrationModal: React.Dispatch<React.SetStateAction<boolean>>
  setIsShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>
}

const PhoneHeader: FC<Props> = (props) => {
  const {setCheckedBurgerMenu, checkedBurgerMenu, setIsShowRegistrationModal, setIsShowAccountModal, setIsShowLoginModal} = props
  return (
    <>
      <section className={styles.headerContainer}>
        <div className={styles.visibleHeader}>
          <Logo/>
          <BurgerMenu
            value={checkedBurgerMenu}
            checkedHandler={setCheckedBurgerMenu}
          />
        </div>
        <div
          className={`${
            checkedBurgerMenu
              ? styles["visible_burger_menu_content"]
              : styles["not_visible_burger_menu_content"]
          }`}
        >
          <Search/>
          <User setCheckedBurgerMenu={setCheckedBurgerMenu} setIsShowLoginModal={setIsShowLoginModal} setIsShowRegistrationModal={setIsShowRegistrationModal}
                setIsShowAccountModal={setIsShowAccountModal}/>
          <Sidebar setCheckedBurgerMenu={setCheckedBurgerMenu}/>
        </div>
      </section>
    </>
  );
};

export default PhoneHeader;