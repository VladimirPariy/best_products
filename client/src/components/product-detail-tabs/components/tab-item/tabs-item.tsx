import React, {FC} from "react";

import styles from "components/product-detail-tabs/components/tab-item/tabs-item.module.scss"

import {getClassNameByCondition} from "lib/utils/get-class-by-condition";

interface Props {
  value: string;
  activeHandler: (tab: string) => void;
  active: string;
  commentLength?: number;
}

const TabsItem: FC<Props> = ({value, activeHandler, active, commentLength}) => {
  const tabClassName = getClassNameByCondition(styles, 'tab', 'activeTab', active === value, '')
  return (
    <div onClick={() => activeHandler(value)} className={tabClassName}>
      {value}{typeof commentLength !== 'undefined' && <div>({commentLength})</div>}
    </div>
  );
};

export default TabsItem;