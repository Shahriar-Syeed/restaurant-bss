
import { modalActions } from "./modal-slice.js";
// import { api } from "./axiosInstance";
import { registerActions } from "./register-slice.js";
import axios from "axios";



export const createUser= (formData) => {
  return async (dispatch) => {
    dispatch(modalActions.close());
    dispatch(registerActions.loading(true));

   
    console.log("Data", formData);
    try {
      const response = await axios.post("https://restaurantapi.bssoln.com/api/Auth/signUp", formData);
      console.log("createResult", response);
      if (response.status === 200) {
        dispatch(modalActions.close());
        dispatch(registerActions.showPreview(undefined));
        sessionStorage.setItem("token", "Bearer" + response.data.token);
        sessionStorage.setItem("refreshToken",response.data.refreshToken);
        dispatch(registerActions.loading(false));
        
      }
      return response;
    } catch (error) {
      dispatch(modalActions.id("user-create-error"));
      dispatch(registerActions.loading(false));
      dispatch(registerActions.errorMessage(error.message));
      dispatch(modalActions.open());
      console.log(error);
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};



export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
};

export function dateConvertToString(date) {
  if (!date) return "";
  const newDate = new Date(date);
  if (isNaN(newDate)) return "";
  const dateString = newDate.toISOString();
  return dateString;
}
