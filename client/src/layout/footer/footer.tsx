import Facebook from "assets/icon/footer/facebook";
import Instagram from "assets/icon/footer/instagram";
import Youtube from "assets/icon/footer/youtube";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import logo from "assets/icon/header/logo.svg";

import styles from "layout/footer/footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.selectContainer}>
        <div className={styles.title}>Our services</div>
        <div className={styles.links}>
          <NavLink to={"/"}>Product reviews</NavLink>
          <NavLink to={"/"}>Reviews of stores</NavLink>
        </div>
      </div>
      <div className={styles.selectContainer}>
        <div className={styles.title}>To users</div>
        <div className={styles.links}>
          <NavLink to={"/"}>FAQ for users</NavLink>
          <NavLink to={"/"}>About the project</NavLink>
        </div>
      </div>
      <div className={styles.selectContainer}>
        <div className={styles.title}>Feedback</div>
        <div className={styles.links}>
          <NavLink to={"/"}>For users</NavLink>
          <NavLink to={"/"}>For online stores</NavLink>
        </div>
      </div>
      <div className={styles.selectContainer}>
        <div className={styles.title}>Social media</div>
        <div className={styles.socialLink}>
          <NavLink to={"/"}>
            <Facebook />
          </NavLink>
          <NavLink to={"/"}>
            <Instagram />
          </NavLink>
          <NavLink to={"/"}>
            <Youtube />
          </NavLink>
        </div>
      </div>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <div>
            <div>BEST PRODUCTS</div>
            <div>Stay home. Shop online</div>
          </div>
        </div>
        <div className={styles.copywriting}>&#169; Best Products 2022</div>
      </div>
    </footer>
  );
};

export default Footer;
