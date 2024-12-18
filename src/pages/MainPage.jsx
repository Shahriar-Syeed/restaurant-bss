import { Link, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";


export default function MainPage() {
  return (
    <>
      <Navbar>
        <NavLink to='login' className='button__outline--primary lg:px-6 lg:py-3 md:px-5 md:py-2.5 sm:px-4 sm:py-2 es:px-3 es:py-1.5 px-2 py-1 rounded-md text-sx es:text-sm sm:text-md lg:text-lg font-semibold hover:border-white'>Login</NavLink>
      </Navbar>
      <section className="min-h-lvh bg--page grid place-items-center px-2">
        <div>
          <h1 className="2xl:text-3xl xl:text-2xl lg:text-xl text-md mb-3 text-center">Do You want to login or register</h1>
          <Link to='/login' className="button-primary rounded-lg font-bold 2xl:text-3xl xl:text-2xl lg:text-xl text-md block text-center px-6 py-3 w-full mb-3">Login</Link>
          <Link to='/registration' className="bg-slate-600 text-white rounded-lg font-bold 2xl:text-3xl xl:text-2xl lg:text-xl text-md block text-center px-6 py-3 w-full mb-3">Register</Link>
        </div>

      </section>
    </>
  );
}
