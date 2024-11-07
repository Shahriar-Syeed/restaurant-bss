import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState();

  const sidebarRef = useRef();

  const userInfo = JSON.parse(localStorage.getItem("user"));

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
    ? "fixed top-0 left-0 z-50 w-64 h-screen transition-transform  transform-none"
    : "fixed top-0 left-0 z-40 w-64 h-screen transition-transform xl:translate-x-0 -translate-x-full";

  function sidebarToggle() {
    setShowSidebar((prev) => !prev);
  }

  return (
    <div ref={sidebarRef}>
      <button
        aria-controls="defaultSidebar"
        type="button"
        className="flex items-center p-1 text-sm text-primary rounded-lg xl:hidden hover:bg-red-800 focus:outline-none outline-none "
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
      </button>

      <aside id="defaultSidebar" className={sidebarCss} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 flex justify-between flex-col">
          <ul className="space-y-2 font-medium h-full">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-primary rounded-lg text-primary"
              >
                <div className="h-10 w-10 grid place-items-center rounded-full bg-stone-500 hover:bg-black ">
                  {userInfo.image ? (
                    <img
                      src={`https://restaurantapi.bssoln.com/images/user/${userInfo.image}`}
                      alt="User Image"
                      className="w-3/4 rounded-full"
                    />
                  ) : (
                    <svg
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="white"
                      width="75%"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                  )}
                </div>
                <div className="ms-3 d">
                  <h5>{userInfo.fullName}</h5>
                  <p>{userInfo.email}</p>
                </div>
              </a>
              <hr />
            </li>
            <li>
              <NavLink
                to="/admin/home"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-primary rounded-lg  bg-rose-100 text-primary group"
                    : "flex items-center p-2 text-primary rounded-lg  hover:bg-rose-100 text-primary group"
                }
                onClick={sidebarToggle}
                end
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-primary transition duration-75 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.66406,10.25244l-9-8a.99893.99893,0,0,0-1.32812,0l-9,8a.99991.99991,0,0,0,1.32812,1.49512L4,11.449V21a.99974.99974,0,0,0,1,1H19a.99974.99974,0,0,0,1-1V11.449l.33594.29859a.99991.99991,0,0,0,1.32812-1.49512ZM9.18427,20a2.98208,2.98208,0,0,1,5.63146,0ZM10.5,14.5A1.5,1.5,0,1,1,12,16,1.50164,1.50164,0,0,1,10.5,14.5ZM18,20H16.89893a5.00092,5.00092,0,0,0-2.25867-3.22821A3.46849,3.46849,0,0,0,15.5,14.5a3.5,3.5,0,0,0-7,0,3.46849,3.46849,0,0,0,.85974,2.27179A5.00092,5.00092,0,0,0,7.10107,20H6V9.6712l6-5.33331L18,9.6712Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/employee"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-primary rounded-lg  bg-rose-100 text-primary group"
                    : "flex items-center p-2 text-primary rounded-lg  hover:bg-rose-100 text-primary group"
                }
                onClick={sidebarToggle}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-primary transition duration-75 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"></path>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Employees</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/tables"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-primary rounded-lg  bg-rose-100 text-primary group"
                    : "flex items-center p-2 text-primary rounded-lg  hover:bg-rose-100 text-primary group"
                }
                onClick={sidebarToggle}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-primary transition duration-75  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 7.5C22 5.57 17.52 4 12 4S2 5.57 2 7.5c0 1.81 3.95 3.31 9 3.48V15H9.35c-.82 0-1.55.5-1.86 1.26L6 20h2l1.2-3h5.6l1.2 3h2l-1.5-3.74c-.3-.76-1.04-1.26-1.85-1.26H13v-4.02c5.05-.17 9-1.67 9-3.48"></path>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Tables</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/foods"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-primary rounded-lg  bg-rose-100 text-primary group"
                    : "flex items-center p-2 text-primary rounded-lg  hover:bg-rose-100 text-primary group"
                }
                onClick={sidebarToggle}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-primary transition duration-75  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1m15.03-7c0-8-15.03-8-15.03 0zM1.02 17h15v2h-15z"></path>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Foods</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/order"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-primary rounded-lg  bg-rose-100 text-primary group"
                    : "flex items-center p-2 text-primary rounded-lg  hover:bg-rose-100 text-primary group"
                }
                onClick={sidebarToggle}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-primary transition duration-75  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3m0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5"></path>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">New Order</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/new-order"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-primary rounded-lg  bg-rose-100 text-primary group"
                    : "flex items-center p-2 text-primary rounded-lg  hover:bg-rose-100 text-primary group"
                }
                onClick={sidebarToggle}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 fill-primary transition duration-75  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5m0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5m0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5M7 19h14v-2H7zm0-6h14v-2H7zm0-8v2h14V5z"></path>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
              </NavLink>
            </li>
            <li></li>
          </ul>
          <ul>
            <li className="">
              <Link
                to="/login/"
                className="w-full button__outline--primary rounded-full"
              >
                <svg
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-inherit"
                >
                  <path d="M10.09 15.59 11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"></path>
                </svg>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
