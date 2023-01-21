import React, { FC } from "react";

import styles from "components/user-control/components/user-control-head.module.scss";

const UserControlHead: FC = () => {
  return (
    <thead className={styles.tableHead}>
      <tr>
        <td>№</td>
        <td>Full name</td>
        <td>Email</td>
        <td>Phone number</td>
        <td>Role</td>
        <td></td>
      </tr>
    </thead>
  );
};

export default UserControlHead;
