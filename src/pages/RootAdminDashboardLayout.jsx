import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/Navbar";
import CartWithDrawer from "../components/new-order/CartWithDrawer";

export default function RootAdminDashboardLayout() {
  return (
    <>
      <div className="xl:ml-64 ">
        <Navbar>
          <div className="items-stretch self-stretch flex-grow flex gap-1">
            <Link
              to="/admin"
              className="hidden button-primary--dark cursor-pointer py-3 rounded-md px-6"
            >
              Admin
            </Link>
            <Sidebar />
            <CartWithDrawer />
          </div>
        </Navbar>
        <div
          className="xl:p-10 lg:p-8 md:p-6 sm:p-4 p-2 pb-1 xl:pb-4 lg:pb-3 md:pb-2 sm:pb-1 relative sm:h-[calc(100svh-5rem)] es:h-[calc(100svh-8.7rem)] h-[calc(100svh-7.1rem)] overflow-y-auto [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-neutral-200
          [&::-webkit-scrollbar-thumb]:bg-neutral-700 bg--page"
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
