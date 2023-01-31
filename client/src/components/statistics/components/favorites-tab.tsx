import React, { FC } from "react";

import LineChart from "components/ui/chart/line-chart";

import { selectStatisticFavorites } from "store/statistics/statistics-selectors";
import { useAppSelector } from "lib/interfaces/store.types";

const FavoritesTab: FC = () => {
  const favorites = useAppSelector(selectStatisticFavorites);
  return (
    <LineChart
      x={favorites.map((item) => item.product_title)}
      y={favorites.map((item) => item.favorites_amount)}
      label="Favorites amount"
    />
  );
};

export default FavoritesTab;
