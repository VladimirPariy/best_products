import React, { FC } from "react";

import View from "assets/icon/sort/view";
import View1 from "assets/icon/sort/view-1";
import styles from "components/sort-panel/components/view-sort.module.scss";

interface Props {
  viewStyle: boolean;
  changeView: () => void;
}

const ViewSort: FC<Props> = ({ viewStyle, changeView }) => {
  return (
    <div onClick={changeView} className={styles.view}>
      {viewStyle ? <View /> : <View1 />}
    </div>
  );
};

export default ViewSort;
