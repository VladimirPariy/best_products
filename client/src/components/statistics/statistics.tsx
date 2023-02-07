import React, { FC, useEffect, useState } from "react";

import styles from "components/statistics/statistics.module.scss";

import TabsItem from "components/ui/tab-item/tabs-item";
import {
  clearStatistics,
  getStatisticsTrigger,
} from "store/statistics/statistics-actions";
import { useAppDispatch } from "lib/interfaces/store.types";

import CommentedTab from "components/statistics/components/commented-tab";
import FavoritesTab from "components/statistics/components/favorites-tab";
import HighestRatingTab from "components/statistics/components/highest-rating-tab";
import PopularTab from "components/statistics/components/popular-tab";
import UsersTab from "components/statistics/components/users-tab";

const statisticTabs = [
  { title: "New users", tab: <UsersTab /> },
  { title: "Most popular", tab: <PopularTab /> },
  { title: "Highest rating", tab: <HighestRatingTab /> },
  { title: "Most commented", tab: <CommentedTab /> },
  { title: "Most favorites", tab: <FavoritesTab /> },
];

const Statistics: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(statisticTabs[0].title);
  const tabHandler = (tab: string) => {
    setActiveTab(tab);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStatisticsTrigger());
    return () => {
      dispatch(clearStatistics());
    };
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
