import React, { FC } from "react";

import styles from "components/product-detail/product-detail-tabs/components/tabs-list/tabs-list.module.scss";

import {
  TabsAdminEnum,
  TabsUserEnum,
} from "components/product-detail/product-detail-tabs/components/tabs-enum";
import { useAppSelector } from "lib/interfaces/store.types";
import { selectUser } from "store/user/user-selector";
import TabsItem from "components/ui/tab-item/tabs-item";

interface Props {
  activeHandler: (tab: string) => void;
  activeTab: string;
  commentsAmount: number;
}

const TabsList: FC<Props> = ({ activeHandler, activeTab, commentsAmount }) => {
  const user = useAppSelector(selectUser);

  const tabs = user?.role === 1 ? TabsAdminEnum : TabsUserEnum;
  return (
    <div className={styles.tabsListContainer}>
      {tabs.map((item) => (
        <TabsItem
          key={item}
          value={item}
          activeHandler={activeHandler}
          active={activeTab}
          commentLength={item === "Comments" ? commentsAmount : undefined}
        />
      ))}
    </div>
  );
};

export default TabsList;
