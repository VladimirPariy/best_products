import React, { FC } from "react";

import BarChart from "components/ui/chart/bar-chart";

import { selectStatisticPopular } from "store/statistics/statistics-selectors";
import { useAppSelector } from "lib/interfaces/store.types";

const PopularTab: FC = () => {
  const popular = useAppSelector(selectStatisticPopular);

  return (
    <BarChart
      label="Views"
      x={popular.map((item) => item.product_title)}
      y={popular.map((item) => item.views_amount)}
    />
  );
};

export default PopularTab;
