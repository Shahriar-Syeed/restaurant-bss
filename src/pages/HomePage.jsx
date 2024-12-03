import { useDispatch, useSelector } from "react-redux";
import BarGraph from "../components/home/BarGraph.jsx";
import LineGraph from "../components/home/LineGraph.jsx";
import { useEffect } from "react";
import { getAdminStatistics } from "../store/adminStatistic-actions.js";
import EmployeesGraph from "../components/home/EmployeesGraph.jsx";
import TableGraph from "../components/home/TableGraph.jsx";
import OrdersGraph from "../components/home/OrdersGraph.jsx";
import FoodsGraph from "../components/home/FoodsGraph.jsx";
import { Link } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch();
  const employeesData = useSelector(
    (state) => state.adminStatistics.employeesStatistics
  );
  const tablesData = useSelector(
    (state) => state.adminStatistics.tablesStatistics
  );
  const foodsData = useSelector(
    (state) => state.adminStatistics.foodsStatistics
  );
  const ordersData = useSelector(
    (state) => state.adminStatistics.ordersStatistics
  );

  useEffect(() => {
    dispatch(getAdminStatistics());
  }, []);
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 ">
        <Link to='../employee/employee-list' className="bg-white rounded-lg p-4 shadow-xl border-t-4 border-primary hover:shadow-2xl hover:bg-stone-50 min-h-52">
          <EmployeesGraph graphClassName="max-w-full max-h-40" iconClassName="w-9 text-primary p-2 bg-red-600/25 rounded-lg" totalEmployees={employeesData.length}/>
        </Link>
        <Link to='../tables' className="bg-white rounded-lg p-4 shadow-xl border-t-4 border-primary hover:shadow-2xl hover:bg-stone-50 " >
          <TableGraph graphClassName="max-w-full max-h-40" iconClassName="w-9 text-primary p-2 bg-red-600/25 rounded-lg" totalTables={tablesData.length} />
        </Link>
        <Link to='../foods' className="bg-white rounded-lg p-9 shadow-xl border-t-4 border-primary hover:shadow-2xl hover:bg-stone-50">
          <FoodsGraph graphClassName="max-w-full max-h-40" iconClassName="w-9 text-primary p-2 bg-red-600/25 rounded-lg" totalFoods={foodsData.length} />
        </Link>
        <Link to='../order' className="bg-white rounded-lg p-9 shadow-xl border-t-4 border-primary hover:shadow-2xl hover:bg-stone-50" >
          <OrdersGraph graphClassName="max-w-full max-h-40" iconClassName="w-9 text-primary p-2 bg-red-600/25 rounded-lg" totalOrders={ordersData.length} />
        </Link>
      </div>
      <div className="grid xl:grid-cols-2 gap-3 pt-4">
        <LineGraph />
        <BarGraph />
      </div>
    </>
  );
}
