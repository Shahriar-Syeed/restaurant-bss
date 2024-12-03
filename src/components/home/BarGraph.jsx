import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
 BarElement,
  Title,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Legend
);

export default function BarGraph() {
  // const options = {};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const lineChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Sales Figures",
        data: [30000, 50000, 40000, 60000, 80000, 70000, 20100, 35200, 45300, 78400, 55500, 42600,],
        borderWidth: 3,
        backgroundColor: '#cc080b',
        fill: false,
        borderRadius: '1.5rem',
      },
    ],
  };
  return (
    <>
      <Bar options={options} data={lineChartData} className="bg-white rounded-lg p-9 shadow-xl  max-w-full max-h-96" />
    </>
  );
}
