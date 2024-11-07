import { Link, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";


export default function MainPage() {
  return (
    <>
      <Navbar>
        <NavLink to='login' className='button__outline--primary px-6 py-3 rounded-md text-lg font-semibold hover:border-white'>Login</NavLink>
      </Navbar>
      <section className="min-h-lvh bg--page grid place-items-center px-2">
        <div>
          <h1 className="text-4xl mv-3">Do You want to login or register</h1>
          <Link to='/login' className="button-primary rounded-lg font-bold text-4xl block text-center px-6 py-3 w-full mb-3">Login</Link>
          <Link to='/register' className="button-primary rounded-lg font-bold text-4xl block text-center px-6 py-3 w-full mb-3">Register</Link>
        </div>

      </section>
    </>
  );
}
