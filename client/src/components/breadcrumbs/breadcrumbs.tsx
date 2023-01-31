import React, { FC } from "react";
import { useLocation } from "react-router";

import styles from "components/breadcrumbs/breadcrumbs.module.scss";
import { Link } from "react-router-dom";
import Arrow from "assets/icon/general/arrow";

interface Props {}

const Breadcrumbs: FC<Props> = (props) => {
  const location = useLocation();

  const crumbs = location.pathname.split("/");
  let currentLink = "";

  const breadcrumbs = crumbs.map((item, index, arr) => {
    currentLink += `${item}/`;
    if (item === "" || item === "product") {
      return null;
    }
    return (
      <Link
        to={`${currentLink.slice(0, -1)}`}
        key={index}
        className={styles.crumb}
      >
        {item}
        {arr.length - 1 === index ? "" : <Arrow />}
      </Link>
    );
  });

  return <div className={styles.breadcrumbs}>{breadcrumbs}</div>;
};

export default Breadcrumbs;
