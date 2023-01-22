import React, { FC, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  ChartData,
} from "chart.js";

import styles from "components/product-detail/product-detail-tabs/components/price-history-tab/price-history-tab.module.scss";

import { getDate } from "lib/utils/get-date";
import {
  clearPriceHistory,
  getPriceHistoryTrigger,
} from "store/price-history/price-history-actions";
import {
  selectPriceHistory,
  selectPriceHistoryError,
  selectPriceHistoryStatus,
} from "store/price-history/price-history-selectors";
import { useAppDispatch, useAppSelector } from "store/store-types";

import { Loader } from "components/ui/loader/loader";
import ErrorContainer from "components/ui/error-container/error-container";

interface Props {
  product_id: number;
}

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);
const color = "#766ed3";

const PriceHistoryTab: FC<Props> = ({ product_id }) => {
  const priceHistory = useAppSelector(selectPriceHistory);
  const isLoading = useAppSelector(selectPriceHistoryStatus);
  const error = useAppSelector(selectPriceHistoryError);
  const dispatch = useAppDispatch();

  const [data, setData] = useState<ChartData<"line", string[], string>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    setData({
      labels: priceHistory.map((item) => getDate(item.updated_at)),
      datasets: [
        {
          label: "Price dynamics",
          data: priceHistory.map((item) => item.price_at_timestamp),
          backgroundColor: color,
          borderColor: color,
        },
      ],
    });
  }, [priceHistory]);

  useEffect(() => {
    dispatch(getPriceHistoryTrigger(product_id));
    return () => {
      dispatch(clearPriceHistory());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && <Loader color={color} />}
      {error && (
        <ErrorContainer
          errorText="Some error has occurred. Please try again later"
          style={{ color: "rgba(252, 48, 3, 1)", textAlign: "center" }}
        />
      )}
      {priceHistory?.length > 0 && (
        <div className={styles.chartContainer}>
          <Line data={data} />
        </div>
      )}
    </>
  );
};

export default PriceHistoryTab;
