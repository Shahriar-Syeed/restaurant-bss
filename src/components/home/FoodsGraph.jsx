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
import FoodGraphIcon from "../svg/FoodGraphIcon";
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

export default function FoodsGraph({
  graphClassName,
  totalFoods,
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
        data: [21, 35, 32, 27],
        borderColor: "#cc080b",
        stepped: true,
        backgroundColor: gradient || "rgba(255, 99, 132, 0.2)",
        fill: {
          target: "origin", // 3. Set the fill options
          above: "rgba(255, 99, 132, 0.2)",
        },
      },
    ],
  };
  return (
    <>
      <h3 className="text-primary font-bold text-lg text-center">Foods</h3>
      <div className="flex gap-10 items-center justify-center">
        <FoodGraphIcon className={iconClassName} />
        <p className="text-red-900 font-bold text-2xl">{totalFoods}</p>
      </div>

      <Line options={options} data={lineChartData} className={graphClassName} ref={chartRef}/>
    </>
  );
}
