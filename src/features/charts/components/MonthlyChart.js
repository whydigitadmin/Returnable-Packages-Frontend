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

const monthlyData = {
  labels: [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
  ],
  datasets: [
    {
      label: "Monthly Performance",
      data: [100, 110, 90, 120, 130, 150, 140, 135, 145, 155, 160, 170], // Sample data
      backgroundColor: "rgba(153, 102, 255, 0.6)",
      borderColor: "rgba(153, 102, 255, 1)",
      borderWidth: 1,
    },
  ],
};

const monthlyOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Performance",
    },
  },
};

function MonthlyPerformanceChart() {
  return <Bar data={monthlyData} options={monthlyOptions} />;
}

export default MonthlyPerformanceChart;
