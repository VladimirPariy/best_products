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
import styles from "components/product-detail/product-detail-tabs/components/price-history-tab/price-history-tab.module.scss";
import React, { FC } from "react";
import { Bar } from "react-chartjs-2";

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
const color = "#766ed3";

interface Props {
  x: string[];
  y: number[];
  label: string;
}

const BarChart: FC<Props> = ({ x, y, label }) => {
  const data = {
    labels: x,
    datasets: [
      {
        label: label,
        data: y,
        backgroundColor: color,
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
    <div className={styles.chartContainer}>
      <Bar options={options} data={data} style={{ height: "500" }} />
    </div>
  );
};

export default BarChart;
