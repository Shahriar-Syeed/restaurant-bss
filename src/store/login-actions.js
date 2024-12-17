import axios from "axios";
import { modalActions } from "./modal-slice.js";
import { loginActions } from "./login-slice.js";

export const setLoginData = (data) => {
  return async (dispatch) => {
    try {
      const res = await dispatch(loginActions.setFormData(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const submitLogin = (formData) => {
  return async (dispatch) => {
    dispatch(loginActions.loading(true));
    try {
      const response = await axios.post(
        `https://restaurantapi.bssoln.com/api/Auth/SignIn`,
        formData
      );
      if (response.status === 200) {
        dispatch(loginActions.loading(false));
        const token = "Bearer " + response.data.token;
        const user = response.data.user;
        const refreshToken = response.data.refreshToken;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("user", JSON.stringify(user));
        return Promise.resolve(`/${user.fullName}`);
      }
    } catch (error) {
      dispatch(modalActions.id("Failed To Login"));
      dispatch(loginActions.loading(false));
      dispatch(loginActions.errorMessage(error.message));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.id(null));
        dispatch(modalActions.close());
      }, 3000);
    }
  };
};