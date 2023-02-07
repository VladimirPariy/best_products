import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "layout/footer/footer.module.scss";
import { IFooterLink } from "layout/footer/footer";

const PageLink: FC<IFooterLink> = (props) => {
  const { title, links } = props;
  return (
    <div className={styles.selectContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.links}>
        {links.map((item) => (
          <NavLink to={item.path} key={item.name}>
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default PageLink;
