import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "components/ui/admin-panel-link/admin-panel-link.module.scss";

import { getClassNameByCondition } from "lib/utils/get-class-by-condition";
import { appUrl } from "lib/enums/app-urls";

const AdminPanelLink: FC = () => {
  return (
    <NavLink
      to={appUrl.admin_panel}
      className={({ isActive }) =>
        getClassNameByCondition(styles, "admin_panel", "active", isActive)
      }
    >
      ADMIN PANEL
    </NavLink>
  );
};

export default AdminPanelLink;
