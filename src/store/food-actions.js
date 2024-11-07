import axios from "axios";
import { foodActions } from "./food-slice.js";
import { modalActions } from "./modal-slice.js";
import { convertBase64 } from "./employee-actions.js";
export const getFoods = (page, perPage) => {
  return async (dispatch) => {
    dispatch(foodActions.loading(true));
    try {
      const response = await axios.get(
        `https://restaurantapi.bssoln.com/api/Food/datatable?Page=${page}&Per_Page=${perPage}`
      );
      console.log(response);
      dispatch(foodActions.getFoodsDataTable(response.data));
      dispatch(foodActions.loading(false));
    } catch (error) {
      dispatch(foodActions.loading(false));
      console.log(error);
      dispatch(foodActions.errorMessage(error.message));
      dispatch(modalActions.open());
      console.log(error);
      setTimeout(() => {
        dispatch(modalActions.close());
      }, 3000);
    }
  };
};

export const deleteFood = (foodId) => {
  return async (dispatch) => {
    dispatch(foodActions.loading(true));
    try {
      const res = await axios.delete(
        `https://restaurantapi.bssoln.com/api/Food/delete/${foodId}`
      );

      if (res.status === 204) {
        dispatch(foodActions.removeFood(foodId));
      }
      dispatch(foodActions.loading(false));
    } catch (error) {
      dispatch(foodActions.loading(false));
      dispatch(foodActions.errorMessage(error.message));
      dispatch(modalActions.open());
      console.log(error);
      setTimeout(() => {
        dispatch(modalActions.close());
      }, 3000);
    }
  };
};

export const createFood = (formData, imageFile) => {
  return async (dispatch) => {
    dispatch(foodActions.loading(true));
    console.log('discount price NAN',formData);
   
    const updatedData = {
      ...formData,
      discount: Number(formData.discount),
      discountPrice: Number(formData.discountPrice),
      price: Number(formData.price),
      discountType: Number(formData.discountType),
    };
    delete updatedData.foodImage;
    try {
  
      if (imageFile) {
        const base64String = await convertBase64(imageFile);
        const finalData = formData.discountPrice ? {
          ...updatedData,
          image: imageFile?.name || "",
          base64: base64String ? base64String : "",
        }:{
          ...updatedData,
          image: imageFile?.name || "",
          base64: base64String ? base64String : "",
          discount:0,
        };
        console.log("finalData",finalData)
        const response = await axios.post(
          "https://restaurantapi.bssoln.com/api/Food/create",
          finalData
        );
        if (response.status === 200) {
          dispatch(foodActions.loading(false));
          dispatch(foodActions.showPreview(undefined));
          dispatch(foodActions.selectedFoodImage(undefined));
          return 200;
        }
      }
    } catch (error) {
      dispatch(foodActions.loading(false));
      dispatch(foodActions.errorMessage(error.message));
      dispatch(modalActions.open());
      console.log(error);
      setTimeout(() => {
        dispatch(modalActions.close());
      }, 3000);
    }
  };
};


