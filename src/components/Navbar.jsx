import Logo from "/logo-icon.png";

export default function Navbar({ children, className }) {
  return (
    <>
      <nav className="bg-primary top-0 z-20">
        <div className="flex flex-wrap items-center justify-between py-4 sm:px-10 ps-2 pe-3 ">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="mx-auto h-8">
              <img src={Logo} alt="Logo" className=" w-full h-full" />
            </div>
            <h2 className="hidden es:block text-center text-white font-semibold whitespace-nowrap">
              BSS RESTAURANT
            </h2>
          </div>
          <div className={className} id="navbar-default">
            {children}
          </div>
        </div>
      </nav>
    </>
  );
}
