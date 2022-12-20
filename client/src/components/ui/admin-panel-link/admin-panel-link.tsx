import {getClassNameByCondition} from "lib/utils/get-class-by-condition";
import React, {FC} from "react";
import {NavLink} from "react-router-dom";

import styles from "components/ui/admin-panel-link/admin-panel-link.module.scss"

import {appUrl} from "lib/enums/app-urls";

interface Props {
}

const AdminPanelLink: FC<Props> = (props) => {

  return (
    <NavLink to={appUrl.admin_panel} className={({isActive}) => getClassNameByCondition(
      styles,
      "admin_panel",
      "active",
      isActive
    )}>
      ADMIN PANEL
    </NavLink>
  );
};

export default AdminPanelLink;