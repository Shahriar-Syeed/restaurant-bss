import { useState } from "react";
import Input from "../UI/Input.jsx";
import Logo from "../../assets/logo-icon.png";
import Button from "../UI/Button.jsx";
// import apiUrl from "../../apiUrl/ApiUrl.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading.jsx";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal-slice.js";
import Modal from "../UI/Modal.jsx";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    userName: "admin@mail.com",
    password: "Admin@123",
  });
  const {loader, startLoad, endLoad}=useLoading();
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // const fetchData =new FormData(event.target);
    // const loginData = Object.fromEntries(fetchData.entries());
    // console.log(loginData);
    // const logData = JSON.stringify(loginData);
    startLoad();
    try {
      console.log(formData);
      const response = await axios.post(
        `https://restaurantapi.bssoln.com/api/Auth/SignIn`,
        formData
      );
      console.log(response);
      if(response.status === 200){
        const token = "Bearer " + response.data.token;
        const user = response.data.user;
        console.log(user,JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate(`/${user.fullName}`);
      }

    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
    openModal();
    setTimeout(()=>{
      endLoad();
      closeModal();
      return;
    },3000);
    }
    endLoad();
  }
  const isOpen = useSelector(state=> state.modal.open);
  console.log(isOpen);
  const dispatch = useDispatch();
  function openModal (){
    dispatch(modalActions.open());
  }
  function closeModal () {
    dispatch(modalActions.close());
  }

  return (
    <>
      <div className="login__right__container">
    <Modal open={isOpen} onClose={closeModal} >
      <h1>Failed To Login</h1>
      <p>Invalid Password or Username</p>
      <div className="modal-action p-2">
        <Button className='float-end button-primary px-4 py-2 rounded-lg' onClick={closeModal}>Close</Button>
      </div>
    </Modal>
      <header className="mb-5">
        <img src={Logo} alt="Logo" className=" mx-auto w-28" />
        <h1 className=" text-center text-white font-bold">BSS RESTAURANT</h1>
      </header>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="mb-5">
          <Input
            type="text"
            required
            id="userName"
            className="block rounded border border-solid w-full border-slate-250 h-6 leading-6 px-3.5 py-8 "
            value={formData.userName}
            onChange={(event) => handleChange(event)}
          >
            Username
          </Input>
        </div>
        <div className="mb-5">
          <Input
            required
            id="password"
            className="h-6 leading-6 p-3"
            eyeButton
            value={formData.password}
            onChange={(event) => handleChange(event)}
          >
            Password
          </Input>
        </div>
        <Button
          type="submit"
          className="w-full text-white px-4 py-2 button-primary rounded uppercase mb-5 tracking-2px"
        >
          LOGIN
        </Button>
        <Link
          to="/"
          className="w-full text-red-600 px-4 font-medium rounded capitalize tracking-2px"
        >
          Back To Home
        </Link>
      </form>
    </div>
    {loader}
    </>
  );
}
