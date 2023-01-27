import React, { FC } from "react";

import LineChart from "components/ui/chart/line-chart";

import { selectStatisticCommented } from "store/statistics/statistics-selectors";
import { useAppSelector } from "store/store-types";

const CommentedTab: FC = () => {
  const commented = useAppSelector(selectStatisticCommented);

  return (
    <LineChart
      x={commented.map((item) => item.product_title)}
      y={commented.map((item) => item.comments_amount)}
      label="Comments amount"
    />
  );
};

export default CommentedTab;
