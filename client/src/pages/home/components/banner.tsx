import banner from "assets/images/banner.png";
import React, { FC } from "react";
import styles from "pages/home/components/banner.module.scss";

const Banner: FC = () => {
  return <img src={banner} alt="" className={styles.banner} />;
};

export default Banner;
