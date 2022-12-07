import React, {FC, useState} from "react";

import styles from "layout/header/header.module.scss"

import {getClassNameByCondition} from "lib/utils/get-class-by-condition";
import {useScreenWidth} from "lib/hooks/use-screen-width";

import BurgerMenu from "layout/header/components/burger-menu";
import Sidebar from "components/sidebar/sidebar";
import Logo from "layout/header/components/logo";
import Search from "layout/header/components/search";
import User from "layout/header/components/user";


const Header: FC = () => {
  const [checkedBurgerMenu, setCheckedBurgerMenu] = useState<boolean>(false)

  const userScreenWidth = useScreenWidth()

  const classNameForBurgerContent = getClassNameByCondition(styles, 'visible_burger_menu_content', 'not_visible_burger_menu_content', checkedBurgerMenu)

  return (
    userScreenWidth > 768 ?
      <>
        <section className={styles.headerContainer}>
          <Logo/>
          <Search/>
          <User/>
        </section>
      </>
      :
      <>
        <section className={styles.headerContainer}>
          <div className={styles.visibleHeader}>
            <Logo/>
            <BurgerMenu value={checkedBurgerMenu}
                        checkedHandler={setCheckedBurgerMenu}/>
          </div>
          <div className={classNameForBurgerContent}>
            <Search/>
            <User/>
            <Sidebar/>
          </div>
        </section>
      </>
  )
}

export default Header;