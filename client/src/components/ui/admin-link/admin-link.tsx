import { IAdminLinks } from "pages/admin/admin-panel";
import React, { FC } from "react";
import styles from "components/ui/admin-link/admin-link.module.scss";
import { Link } from "react-router-dom";

interface Props {
  item: IAdminLinks;
}

const AdminLink: FC<Props> = ({ item }) => {
  return (
    <Link to={item.url} className={styles.link}>
      {item.icon}
      {item.title}
    </Link>
  );
};

export default AdminLink;
