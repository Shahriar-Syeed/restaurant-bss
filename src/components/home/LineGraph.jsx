import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend,
  Filler
);

export default function LineGraph({ graphClassName }) {
  // const options = {};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const lineChartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Weekly cost",
        data: [3000, 5000, 4000, 6000, 8000, 7000, 8000],
        borderColor: "rgb(75, 192, 192)",
        borderRadius: "3rem",
        fill: {
          target: "origin",
          above: "rgba(53, 162, 235, 0.3)",
        },
        tension: "0.5",
      },
      {
        label: "Weekly sells",
        data: [2500, 4500, 5500, 5000, 3200, 3000, 6500],
        borderColor: "red",
        stroke: "green",
        // borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.3)",
        tension: "0.5",
        stepped: true,
        // backgroundColor: "rgba(255, 99, 132, 0.2)",
        backgroundImage: "rgba(255, 99, 132, 0.2)",
        fill: {
          target: "origin", // 3. Set the fill options
          above: "rgba(255, 0, 0, 0.3)",
        },
      },
    ],
  };
  return (
    <>
      <Line options={options} data={lineChartData} className={graphClassName} />
    </>
  );
}
