import React, { FC } from "react";

import styles from "components/statistics/components/user-table-body.module.scss";

import { IStatisticsUsers } from "lib/interfaces/statistics/statistics.interface";
import { getDate } from "lib/utils/get-date";

interface Props {
  item: IStatisticsUsers[];
}

const UserTableBody: FC<Props> = ({ item }) => {
  return (
    <tbody className={styles.tableBody}>
      {item.map((item, index) => (
        <tr key={item.user_id}>
          <td>{index + 1}</td>
          <td>
            {item.first_name} {item.last_name}
          </td>
          <td>{item.email}</td>
          <td>{item.phone_number}</td>
          <td>{getDate(item.created_at)}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default UserTableBody;
