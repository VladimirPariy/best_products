import React, { FC } from "react";

import styles from "components/ui/table-head/table-head.module.scss";

interface Props {
  items: string[];
}

const TableHead: FC<Props> = ({ items }) => {
  return (
    <thead className={styles.tableHead}>
      <tr>
        {items.map((item) => (
          <td key={item}>{item}</td>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
