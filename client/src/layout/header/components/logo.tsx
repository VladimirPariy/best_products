import React, {FC} from "react";

import styles from "layout/header/header.module.scss";
import logo from "assets/icon/header/logo.svg"

interface Props {
}

const Logo: FC<Props> = (props) => {
  return (
    <div className={styles.logoContainer}>
      <img src={logo} alt="" className={styles.logoImage}/>
      <div className={styles.logoText}>
        <div>BEST</div>
        <div>PRODUCTS</div>
      </div>
    </div>
  );
};

export default Logo;