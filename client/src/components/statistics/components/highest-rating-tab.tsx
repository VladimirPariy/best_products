import React, { FC } from "react";

import BarChart from "components/ui/chart/bar-chart";
import { selectStatisticRating } from "store/statistics/statistics-selectors";
import { useAppSelector } from "store/store-types";

const HighestRatingTab: FC = () => {
  const rating = useAppSelector(selectStatisticRating);

  return (
    <BarChart
      x={rating.map((item) => item.product_title)}
      y={rating.map((item) => Math.round(item.averageRating * 100))}
      label="Rating"
    />
  );
};

export default HighestRatingTab;
