import Logo from "../assets/logo-icon.png";

export default function Navbar({ children }) {
  return (
    <>
      <nav className="bg-primary sticky top-0 z-20">
        <div className="flex flex-wrap items-center justify-between py-4 sm:px-10 ps-2 pe-3 ">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} alt="Logo" className=" mx-auto h-8" />
            <h2 className=" text-center text-white font-semibold whitespace-nowrap">
              BSS RESTAURANT
            </h2>
          </div>
          <div className="" id="navbar-default">
            {children}
          </div>
        </div>
      </nav>
    </>
  );
}
