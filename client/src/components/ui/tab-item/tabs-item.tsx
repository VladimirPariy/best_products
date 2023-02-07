import React, { FC } from "react";

import styles from "components/ui/tab-item/tabs-item.module.scss";

import { getClassNameByCondition } from "lib/utils/get-class-by-condition";

interface Props {
  value: string;
  activeHandler: (tab: string) => void;
  active: string;
  commentLength?: number;
}

const TabsItem: FC<Props> = ({
  value,
  activeHandler,
  active,
  commentLength,
}) => {
  const tabClassName = getClassNameByCondition(
    styles,
    "tab",
    "activeTab",
    active === value,
    ""
  );

  const clickHandler = () => {
    activeHandler(value);
  };

  const commentLengthNode = typeof commentLength !== "undefined" && (
    <div>({commentLength})</div>
  );

  return (
    <div onClick={clickHandler} className={tabClassName}>
      {value}
      {commentLengthNode}
    </div>
  );
};

export default TabsItem;
