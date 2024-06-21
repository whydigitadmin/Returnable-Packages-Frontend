import {
  ArcElement,
  Chart as ChartJS,
  Filler,
  Legend,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import TitleCard from "../../../components/Cards/TitleCard";

ChartJS.register(ArcElement, Tooltip, Legend, Filler);

function PieChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = [
    "India",
    "Middle East",
    "Europe",
    "US",
    "Latin America",
    "Asia(non-india)",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "# of Orders",
        data: [50, 90, 55, 51, 82, 72],
        backgroundColor: [
          "#f9c80e",
          "#f86624",
          "#ea3546",
          "#662e9b",
          "#43bccd",
          "#4FB477", // Repeat colors to match the number of data points
        ],
        borderColor: [
          "#f9c80e",
          "#f86624",
          "#ea3546",
          "#662e9b",
          "#43bccd",
          "#4FB477", // Repeat colors to match the number of data points
        ],
        borderWidth: 1,
        // borderRadius: 2,
      },
    ],
  };

  return (
    <TitleCard title={"Allotment Share"} style={{ borderRadius: "10px" }}>
      <div style={{ width: "330px", height: "300px", margin: "auto" }}>
        <Pie options={options} data={data} />
      </div>
    </TitleCard>
  );
}

export default PieChart;
