import { createBrowserRouter, redirect } from "react-router-dom";
import EmployeeTablesListPage from "../pages/EmployeeTablesListPage.jsx";
import RootEmployeeTables from "../pages/RootEmployeeTables.jsx";
import RootLayout from "../pages/Root.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import MainPage from "../pages/MainPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RootAdminDashboardLayout from "../pages/RootAdminDashboardLayout.jsx";
import UserInfoPage from "../pages/UserInfoPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import RootEmployeeLayout from "../pages/RootEmployee.jsx";
import EmployeeListPage from "../pages/EmployeeListPage.jsx";
import EmployeeAddPage from "../components/employee/EmployeeAddPage.jsx";
import EmployeeEditPage from "../components/employee/EmployeeEditPage.jsx";
import TableAddPage from "../components/employee-table/TableAddPage.jsx";
import RootFood from "../pages/RootFood.jsx";
import FoodsListPage from "../pages/FoodsListPage.jsx";
import FoodAddPage from "../components/food/FoodAddPage.jsx";
import FoodEditPage from "../components/food/FoodEditPage.jsx";
import NewOrderPage from "../pages/NewOrderPage.jsx";
import OrderListPage from "../pages/OrderListPage.jsx";
import RegistrationPage from "../pages/RegistrationPage.jsx";

const requireAuth = async () => {
  const user = await JSON.parse(sessionStorage.getItem("user"));
  const saveToken = sessionStorage.getItem("token");
  if (
    user?.id === "eb87aaa2-bf85-48d5-56a4-08d906dd12b1" &&
    saveToken?.startsWith("Bearer")
  ) {
    return null;
  } else {
    return redirect("/login");
  }
};
const checkAlreadyLogin = async () => {
  const userName = await JSON.parse(sessionStorage.getItem("user"));
  const saveToken = sessionStorage.getItem("token");
  if (
    userName?.id === "eb87aaa2-bf85-48d5-56a4-08d906dd12b1" &&
    saveToken?.startsWith("Bearer")
  ) {
    return redirect("/admin");
  } else {
    return null;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "registration",
        element: <RegistrationPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
        loader: checkAlreadyLogin,
      },
      {
        path: "admin",
        element: <RootAdminDashboardLayout />,
        loader: requireAuth,
        children: [
          { index: true, element: <UserInfoPage /> },
          { path: "home", element: <HomePage /> },
          {
            path: "employee",
            element: <RootEmployeeLayout />,
            children: [
              {
                index: true,
                path: "employee-list",
                element: <EmployeeListPage />,
              },
              {
                path: "employee-add",
                element: <EmployeeAddPage />,
              },
              {
                path: ":employeeId/employee-edit",
                element: <EmployeeEditPage />,
              },
            ],
          },

          {
            path: "tables",
            element: <RootEmployeeTables />,
            children: [
              { index: true, element: <EmployeeTablesListPage /> },
              { path: "add-table", element: <TableAddPage /> },
            ],
          },
          {
            path: "foods",
            element: <RootFood />,
            children: [
              { index: true, element: <FoodsListPage /> },
              { path: "add-food", element: <FoodAddPage /> },
              {
                path: ":foodId/food-edit",
                element: <FoodEditPage />,
              },
            ],
          },

          {
            path: "new-order",

            element: <NewOrderPage />,
          },
          {
            path: "order",
            element: <OrderListPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
