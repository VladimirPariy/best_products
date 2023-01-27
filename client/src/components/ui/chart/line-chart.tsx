import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { FC } from "react";
import styles from "components/product-detail/product-detail-tabs/components/price-history-tab/price-history-tab.module.scss";
import { Line } from "react-chartjs-2";

interface Props {
  x: string[];
  y: number[];
  label: string;
}

Chart.register(
  BarController,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement
);

const LineChart: FC<Props> = ({ x, y, label }) => {
  const data = {
    labels: x,
    datasets: [
      {
        tension: 0.3,
        fill: true,
        label: label,
        data: [...y, 0],
        backgroundColor: "rgba(118, 110, 211, 0.7)",
        borderColor: "rgb(118, 110, 211)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ height: "720px" }}>
      <div className={styles.chartContainer}>
        <Line data={data} options={options} style={{ height: "500" }} />
      </div>
    </div>
  );
};

export default LineChart;
