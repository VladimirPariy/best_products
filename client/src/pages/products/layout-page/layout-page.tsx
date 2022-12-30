import Breadcrumbs from "components/ui/breadcrumbs/breadcrumbs";
import React, { FC } from "react";
import { Outlet } from "react-router";

interface Props {}

const LayoutPage: FC<Props> = (props) => {
  return (
    <div>
      <Breadcrumbs />
      <Outlet />
    </div>
  );
};

export default LayoutPage;
