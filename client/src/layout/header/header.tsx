import React, {FC} from "react";

import styles from "layout/header/header.module.scss"

import {useScreenWidth} from "lib/hooks/use-screen-width";

import Sidebar from "components/sidebar/sidebar";
import Logo from "layout/header/components/logo";
import Search from "layout/header/components/search";
import User from "layout/header/components/user";

interface Props {
}

const Header: FC<Props> = (props) => {
  const userScreenWidth = useScreenWidth()
  return (
    <>
    <section className={styles.headerContainer}>
      <Logo/>
      <Search/>
      <User/>
    </section>
      {
        userScreenWidth > 768 ? null :
          <Sidebar/>
      }
    </>
  );
};

export default Header;