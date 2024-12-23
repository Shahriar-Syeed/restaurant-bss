import Input from "../UI/Input.jsx";
import Logo from "../../assets/logo-icon.png";
import Button from "../UI/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loader/Loading.jsx";
import { setLoginData, submitLogin } from "../../store/login-actions.js";

export default function LoginForm() {
  const navigate = useNavigate();

  const loginData = useSelector((state) => state.login.formData);
  const isLoading = useSelector((state) => state.login.loading);
  const dispatch = useDispatch();
  function handleChange(e) {
    const { name, value } = e.target;
    dispatch(setLoginData({ ...loginData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await dispatch(submitLogin(loginData));
      navigate(res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {isLoading && <Loading />}
      <div className="login__right__container">
        <header className="mb-5">
          <img src={Logo} alt="Logo" className=" mx-auto w-28" />
          <h1 className=" text-center text-white font-bold">BSS RESTAURANT</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <Input
              type="text"
              required
              id="userName"
              name="userName"
              className="block rounded border border-solid w-full border-slate-250 h-6 leading-6 px-3.5 py-8 "
              value={loginData.userName}
              onChange={(event) => handleChange(event)}
            >
              Username
            </Input>
          </div>
          <div className="mb-5">
            <Input
              required
              id="password"
              name="password"
              className="h-6 leading-6 p-0.5"
              eyeButton
              value={loginData.password}
              onChange={(event) => handleChange(event)}
            >
              Password
            </Input>
          </div>
          <Button
            type="submit"
            className="w-full text-white sm:py-2 sm:px-4 py-1.5 px-3 button-primary rounded  mb-5 tracking-2px"
          >
            Login
          </Button>
          <Link
            to="/"
            className="w-full text-red-600 px-2 font-medium rounded tracking-2px"
          >
            Back to Home
          </Link>
        </form>
      </div>
    </>
  );
}
