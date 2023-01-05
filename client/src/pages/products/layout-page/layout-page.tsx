import Breadcrumbs from "components/ui/breadcrumbs/breadcrumbs";
import SortPanel from "components/ui/sort-panel/sort-panel";
import React, { FC } from "react";
import { Outlet } from "react-router";
import styles from "pages/products/layout-page/layout-page.module.scss"

interface Props {}

const LayoutPage: FC<Props> = (props) => {
  return (
    <div className={styles.wrapper}>
      <Breadcrumbs />
      <SortPanel/>
      <Outlet />
    </div>
  );
};

export default LayoutPage;
