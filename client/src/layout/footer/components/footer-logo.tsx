import React, { FC } from "react";
import logo from "assets/icon/header/logo.svg";
import styles from "layout/footer/footer.module.scss";

const FooterLogo: FC = () => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <div>
          <div className={styles.logoTitle}>BEST PRODUCTS</div>
          <div className={styles.logoText}>Stay home. Shop online</div>
        </div>
      </div>
      <div className={styles.copywriting}>&#169; Best Products 2022</div>
    </div>
  );
};

export default FooterLogo;
