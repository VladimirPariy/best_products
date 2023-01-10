import React, { FC } from "react";

import Filter from "assets/icon/sort/filter";
import styles from "components/sort-panel/components/toggle-filter.module.scss";

interface Props {
  toggle: () => void;
}

const ToggleFilter: FC<Props> = ({ toggle }) => {
  return (
    <div onClick={toggle} className={styles.filter}>
      <Filter />
    </div>
  );
};

export default ToggleFilter;
