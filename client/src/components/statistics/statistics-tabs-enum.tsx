import React from "react";

import CommentedTab from "components/statistics/components/commented-tab";
import FavoritesTab from "components/statistics/components/favorites-tab";
import HighestRatingTab from "components/statistics/components/highest-rating-tab";
import PopularTab from "components/statistics/components/popular-tab";
import UsersTab from "components/statistics/components/users-tab";

export const statisticTabs = [
  { title: "New users", tab: <UsersTab /> },
  { title: "Most popular", tab: <PopularTab /> },
  { title: "Highest rating", tab: <HighestRatingTab /> },
  { title: "Most commented", tab: <CommentedTab /> },
  { title: "Most favorites", tab: <FavoritesTab /> },
];
