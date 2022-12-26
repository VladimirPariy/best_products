import React, { FC } from "react";

import styles from "layout/header/components/logo.module.scss";
import logo from "assets/icon/header/logo.svg";



const Logo: FC = () => {
  return (
    <div className={styles.logoContainer}>
      <img src={logo} alt="" className={styles.logoImage} />
      <div className={styles.logoText}>
        <div>BEST</div>
        <div>PRODUCTS</div>
      </div>
    </div>
  );
};

export default Logo;
