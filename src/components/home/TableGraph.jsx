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
import TableGraphIcon from "../svg/TableIGraphIcon";
import useChartGradient from "../../customHooks/useChartGradient.js";

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

export default function TableGraph({
  graphClassName,
  totalTables,
  iconClassName,
}) {
  const { gradient, chartRef } = useChartGradient(
    "rgba(255, 99, 132, 0.6)", 
    "rgba(255, 255, 255, 0)", 
    200 
  );


  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const lineChartData = {
    labels: ["1st week", "2nd week", "3rd week", "4th week"],
    datasets: [
      {
        label: "Employees",
        data: [17, 10, 20, 13],
        borderColor: "#cc080b",
        stepped: true,
        backgroundColor: gradient || "rgba(255, 99, 132, 0.2)",
        fill: {
          target: "origin",
          above: "rgba(255, 99, 132, 0.2)",
        },
      },
    ],
  };
  return (
    <>
      <h3 className="text-primary font-bold text-lg text-center">Tables</h3>
      <div className="flex gap-10 items-center justify-center">
        <TableGraphIcon className={iconClassName} />
        <p className="text-red-900  font-bold text-3xl">{totalTables}</p>
      </div>

      <Line options={options} data={lineChartData} className={graphClassName} ref={chartRef} />
    </>
  );
}
