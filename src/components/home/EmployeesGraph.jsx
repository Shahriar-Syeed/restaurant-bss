import EmployeeIcon from "../svg/EmployeeIcon.jsx";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import EmployeesWithTieIcon from "../svg/EmployeesWithTieIcon.jsx";
import useChartGradient from "../../customHooks/useChartGradient.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend
);

export default function EmployeesGraph({
  graphClassName,
  totalEmployees,
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
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const lineChartData = {
    labels: ["1st week", "2nd week", "3rd week", "4th week"],
    datasets: [
      {
        data: [20, 16, 15, 17],
        borderColor: "#cc080b",
        stepped: true,
        backgroundColor: gradient || "rgba(255, 99, 132, 0.2)",
        fill: {
          target: "origin",
        },
      },
    ],
  };
  return (
    <>
      <h3 className="text-primary font-bold text-lg text-center">Employees</h3>
      <div className="flex gap-10 items-center justify-center">
        <EmployeesWithTieIcon className={iconClassName} />
        <p className="text-red-900 font-bold text-2xl">{totalEmployees}</p>
      </div>

      <Line options={options} data={lineChartData} className={graphClassName} ref={chartRef} />
    </>
  );
}
