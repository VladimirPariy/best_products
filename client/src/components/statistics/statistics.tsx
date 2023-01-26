import React, { FC, useEffect, useState } from "react";

import styles from "components/statistics/statistics.module.scss";

import { statisticTabs } from "components/statistics/statistics-tabs-enum";
import TabsItem from "components/ui/tab-item/tabs-item";
import { getStatisticsTrigger } from "store/statistics/statistics-actions";
import { useAppDispatch } from "store/store-types";

const Statistics: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(statisticTabs[0].title);
  const tabHandler = (tab: string) => {
    setActiveTab(tab);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStatisticsTrigger());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let currentTab: JSX.Element | null = null;
  for (const tab of statisticTabs) {
    if (tab.title === activeTab) {
      currentTab = tab.tab;
    }
  }

  return (
    <>
      <div className={styles.tabsListContainer}>
        {statisticTabs.map((item) => (
          <TabsItem
            key={item.title}
            value={item.title}
            active={activeTab}
            activeHandler={tabHandler}
          />
        ))}
      </div>
      {currentTab}
    </>
  );
};

export default Statistics;
