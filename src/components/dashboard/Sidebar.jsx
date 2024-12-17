import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import adminImage from "../../assets/admin.png";
import Button from "../UI/Button.jsx";
import LogoutIcon from "../svg/LogoutIcon.jsx";
import HomeIcon from "../svg/HomeIcon.jsx";
import EmployeeIcon from "../svg/EmployeeIcon.jsx";
import OrderIcon from "../svg/OrderIcon.jsx";
import NewOrderIcon from "../svg/NewOrderIcon.jsx";
import FoodIcon from "../svg/FoodIcon.jsx";
import TableIcon from "../svg/TableIcon.jsx";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState();

  const sidebarRef = useRef();
  const navigate = useNavigate();

  const userInfo = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const handler = (e) => {
      if (!sidebarRef.current.contains(e.target)) {
        setShowSidebar(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const sidebarCss = showSidebar
    ? "shadow-xl fixed sm:top-0 bottom-0 sm:bottom-auto end-0 sm:end-auto start-0 z-50 sm:w-64 sm:h-screen transition-transform  transform-none"
    : "shadow-xl fixed sm:top-0 bottom-0 sm:bottom-auto end-0 sm:end-auto start-0 z-40 sm:w-64 sm:h-screen transition-transform xl:translate-x-0 sm:-translate-x-full";

  function sidebarToggle() {
    setShowSidebar((prev) => !prev);
  }

  function goToLoginPage() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    navigate("/login");
  }

  return (
    <div ref={sidebarRef} className="flex sm:ps-4 ">
      <Button
        aria-controls="defaultSidebar"
        type="button"
        className="hidden sm:flex items-center p-1 text-sm text-primary rounded-lg xl:hidden hover:bg-red-800 focus:outline-none outline-none"
        onClick={sidebarToggle}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"></path>
        </svg>
      </Button>
      <Link
        to="/admin"
        className="sm:hidden flex items-center p-2 text-primary rounded-lg text-primary"
      >
        <div className="h-6 w-6 rounded-lg overflow-hidden">
          <img
            src={adminImage}
            alt="User Image"
            className="w-full object-cover"
          />
        </div>
      </Link>
      <Button
        onClick={goToLoginPage}
        className="flex sm:hidden items-center p-1 text-sm text-primary rounded-lg xl:hidden hover:bg-red-800 focus:outline-none outline-none "
        type="button"
      >
        <LogoutIcon className="w-6 h-6 fill-white" />
      </Button>

      <aside id="defaultSidebar" className={sidebarCss} aria-label="Sidebar">
        <div className="sm:h-full sm:px-3 py-2 sm:py-4 overflow-y-auto bg-gray-50 sm:flex sm:justify-between sm:flex-col">
          <ul className="sm:space-y-2 font-medium sm:h-full flex flex-wrap sm:block justify-around">
            <li className="hidden sm:list-item">
              <Link
                to="/admin"
                className="flex items-center p-2 text-primary rounded-lg text-primary"
              >
                <div className="h-10 w-10 rounded-50 overflow-hidden">
                  <img
                    src={adminImage}
                    alt="User Image"
                    className="w-full object-cover"
                  />
                </div>
                <div className="ms-3 d">
                  <h5>{userInfo.fullName}</h5>
                  <p>{userInfo.email}</p>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <NavLink
                to="/admin/home"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center flex-col sm:flex-row justify-center sm:justify-stretch es:p-2 p-1 text-primary rounded-lg  bg-rose-100 text-primary group"
                    : "flex items-center flex-col sm:flex-row justify-center sm:justify-stretch es:p-2 p-1 text-primary rounded-lg  hover:bg-rose-100 text-primary group"
                }
                onClick={sidebarToggle}
                end
              >
                <HomeIcon className="es:flex-shrink-0 es:w-5 w-4 es:h-5 h-4 text-primary transition duration-75" />
                <span className="hidden es:inline-block flex-1 sm:ms-3 whitespace-nowrap text-xs sm:text-base md:text-md md:font-bold">
                  Home
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/employee/employee-list"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center flex-col sm:flex-row justify-center sm:justify-stretch es:p-2 p-1 rounded-lg  bg-rose-100 text-primary group"
                    : "flex items-center flex-col sm:flex-row justify-center sm:justify-stretch es:p-2 p-1 rounded-lg  hover:bg-rose-100 text-primary group"
                }
                onClick={sidebarToggle}
              >
                <EmployeeIcon className="es:flex-shrink-0 es:w-5 w-4 es:h-5 h-4 text-primary transition duration-75" />
                <span className="hidden es:inline-block flex-1 sm:ms-3 whitespace-nowrap text-xs sm:text-base md:text-md md:font-bold">
                  Employees
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/tables"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center flex-col sm:flex-row justify-center sm:justify-stretch es:p-2 p-1 text-primary rounded-lg  bg-rose-100 text-primary group"
                    : "flex items-center flex-col sm:flex-row justify-center sm:justify-stretch es:p-2 p-1 text-primary rounded-lg  hover:bg-rose-100 text-primary group"
                }
                onClick={sidebarToggle}
              >
                <TableIcon className="es:flex-shrink-0 es:w-5 w-4 es:h-5 h-4 text-primary transition duration-75" />
                <span className="hidden es:inline-block flex-1 sm:ms-3 whitespace-nowrap text-xs sm:text-base md:text-md md:font-bold">
                  Tables
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/foods"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center flex-col sm:flex-row justify-center sm:justify-stretch es:p-2 p-1 text-primary rounded-lg  bg-rose-100 text-primary group"
                    : "flex items-center flex-col sm:flex-row justify-center sm:justify-stretch es:p-2 p-1 text-primary rounded-lg  hover:bg-rose-100 text-primary group"
                }
                onClick={sidebarToggle}
              >
                <FoodIcon className="es:flex-shrink-0 es:w-5 w-4 es:h-5 h-4 text-primary transition duration-75" />

                <span className="hidden es:inline-block flex-1 sm:ms-3 whitespace-nowrap text-xs sm:text-base md:text-md md:font-bold">
                  Foods
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/new-order"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center flex-col sm:flex-row justify-center sm:justify-stretch es:p-2 p-1 text-primary rounded-lg  bg-rose-100 text-primary group"
                    : "flex items-center flex-col sm:flex-row justify-center sm:justify-stretch es:p-2 p-1 text-primary rounded-lg  hover:bg-rose-100 text-primary group"
                }
                onClick={sidebarToggle}
              >
                <NewOrderIcon className="es:flex-shrink-0 es:w-5 w-4 es:h-5 h-4 text-primary  transition duration-75" />

                <span className="hidden es:inline-block flex-1 sm:ms-3 whitespace-nowrap text-xs sm:text-base md:text-md md:font-bold">
                  New Order
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/order"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center flex-col sm:flex-row justify-center sm:justify-stretch es:p-2 p-1 text-primary rounded-lg  bg-rose-100 text-primary group"
                    : "flex items-center flex-col sm:flex-row justify-center sm:justify-stretch es:p-2 p-1 text-primary rounded-lg  hover:bg-rose-100 text-primary group"
                }
                onClick={sidebarToggle}
              >
                <OrderIcon className="es:flex-shrink-0 es:w-5 w-4 es:h-5 h-4 text-primary transition duration-75" />

                <span className="hidden es:inline-block flex-1 sm:ms-3 whitespace-nowrap text-xs sm:text-base md:text-md md:font-bold">
                  Orders
                </span>
              </NavLink>
            </li>
          </ul>
          <ul className="hidden sm:block">
            <li>
              <Button
                onClick={goToLoginPage}
                className="w-full button__outline--primary rounded-lg py-2 "
                type="button"
              >
                <LogoutIcon className="w-5 h-5 fill-inherit" />
                <span>Logout</span>
              </Button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
