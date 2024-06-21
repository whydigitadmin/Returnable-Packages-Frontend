import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const quarterlyData = {
  labels: ["April-June", "July-September", "October-December", "January-March"],
  datasets: [
    {
      label: "Quarterly Performance",
      data: [300, 400, 350, 450], // Sample data
      backgroundColor: [
        "rgba(6, 123, 194, 0.6)", // #067bc2
        "rgba(132, 188, 218, 0.6)", // #84bcda
        "rgba(236, 195, 11, 0.6)", // #ecc30b
        "rgba(243, 119, 72, 0.6)", // #f37748
        "rgba(213, 96, 98, 0.6)", // #d56062
      ],
      borderColor: [
        "rgba(6, 123, 194, 1)",
        "rgba(132, 188, 218, 1)",
        "rgba(236, 195, 11, 1)",
        "rgba(243, 119, 72, 1)",
        "rgba(213, 96, 98, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const quarterlyOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Quarterly Performance",
    },
  },
};

function QuarterlyPerformanceChart() {
  return <Bar data={quarterlyData} options={quarterlyOptions} />;
}

export default QuarterlyPerformanceChart;
