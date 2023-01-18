import React, {FC} from "react";

import styles from "components/product-detail-tabs/components/tabs-list/tabs-list.module.scss"


import {TabsAdminEnum, TabsUserEnum} from "components/product-detail-tabs/components/tabs-enum";
import {useAppSelector} from "store/store-types";
import {selectUser} from "store/user/user-selector";
import TabsItem from "components/product-detail-tabs/components/tab-item/tabs-item";

interface Props {
  activeHandler: (tab: string) => void;
  activeTab: string;
  commentsAmount: number
}

const TabsList: FC<Props> = ({activeHandler, activeTab, commentsAmount}) => {

  const user = useAppSelector(selectUser)

  return (
    <div className={styles.tabsListContainer}>
      {user?.role === 1
        ? TabsAdminEnum.map(item => (
          <TabsItem
            key={item.value}
            value={item.value}
            activeHandler={activeHandler}
            active={activeTab}
            commentLength={item.value === 'Comments' ? commentsAmount : undefined}
          />
        ))
        : TabsUserEnum.map(item => (
          <TabsItem
            key={item.value}
            value={item.value}
            activeHandler={activeHandler}
            active={activeTab}
            commentLength={item.value === 'Comments' ? commentsAmount : undefined}
          />
        ))
      }
    </div>
  );
};

export default TabsList;