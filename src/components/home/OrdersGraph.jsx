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
import OrderIcon from "../svg/OrderIcon.jsx";
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

export default function OrdersGraph({
  graphClassName,
  totalOrders,
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
        data: [50, 40, 30, 45],
        borderColor: "#cc080b",
        stepped: true,
        backgroundColor: gradient || "rgba(255, 99, 132, 0.2)",
        fill: {
          target: "origin", // 3. Set the fill options
        },
      },
    ],
  };
  return (
    <>
      <h3 className="text-primary font-bold text-lg mb-1 text-center">
        Orders
      </h3>

      <div className="flex gap-10 items-center justify-center">
        <OrderIcon className={iconClassName} />
        <p className="text-red-900 font-bold text-3xl">{totalOrders}</p>
      </div>

      <Line options={options} data={lineChartData} className={graphClassName} ref={chartRef} />
    </>
  );
}
