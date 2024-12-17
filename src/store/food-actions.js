import { foodActions } from "./food-slice.js";
import { modalActions } from "./modal-slice.js";
import { api } from "./axiosInstance.js";
export const getFoods = (page, perPage) => {
  return async (dispatch) => {
    dispatch(foodActions.loading(true));
    try {
      const response = await api.get(
        `Food/datatable?Page=${page}&Per_Page=${perPage}`
      );
      dispatch(foodActions.getFoodsDataTable(response.data));
      dispatch(foodActions.loading(false));
    } catch (error) {
      dispatch(foodActions.loading(false));
      dispatch(foodActions.errorMessage(error.message));
      dispatch(modalActions.id("Food Getting Fail"));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};

export const deleteFood = (foodId) => {
  return async (dispatch) => {
    dispatch(foodActions.loading(true));
    try {
      const res = await api.delete(`Food/delete/${foodId}`);

      if (res.status === 204) {
        dispatch(foodActions.removeFood(foodId));
      }
      dispatch(foodActions.loading(false));
    } catch (error) {
      dispatch(modalActions.id("Food Deleting Fail"));
      dispatch(foodActions.loading(false));
      dispatch(foodActions.errorMessage(error.message));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};

export const createFood = (formData) => {
  return async (dispatch) => {
    dispatch(foodActions.loading(true));
    const updatedData = {
      ...formData,
      discount: Number(formData.discount),
      discountPrice: Number(formData.discountPrice),
      price: Number(formData.price),
      discountType: Number(formData.discountType),
    };
    try {
      const response = await api.post("Food/create", updatedData);
      if (response.status === 200) {
        dispatch(foodActions.loading(false));
        dispatch(foodActions.showPreview(undefined));
        dispatch(foodActions.selectedFoodImage(undefined));
      }
      return response;
    } catch (error) {
      dispatch(modalActions.id("Food Adding Fail"));
      dispatch(foodActions.loading(false));
      dispatch(foodActions.errorMessage(error.message));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.id(null));
        dispatch(modalActions.close());
      }, 3000);
    }
  };
};

export const getSingleFoodItem = (id) => {
  return async (dispatch) => {
    dispatch(foodActions.loading(true));
    try {
      const response = await api.get(`Food/get/${id}`);
      dispatch(foodActions.setFoodItem(response.data));
      dispatch(foodActions.loading(false));
    } catch (error) {
      dispatch(modalActions.id("Single Food Getting Fail"));
      dispatch(foodActions.loading(false));
      dispatch(foodActions.errorMessage(error.message));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};

export const setSingleFoodNull = () => {
  return (dispatch) => {
    dispatch(foodActions.setFoodItem(null));
  };
};

export const updateSingleFoodItem = (id, data) => {
  return async (dispatch) => {
    dispatch(foodActions.loading(true));
    try {
      const response = await api.put(`Food/update/${id}`, data);
      if (response.status === 200 || response.status === 204) {
        dispatch(foodActions.updateFood({ id, data }));
        dispatch(foodActions.loading(false));
        dispatch(foodActions.showPreview(undefined));
        dispatch(foodActions.selectedFoodImage(undefined));
        return Promise.resolve("success");
      }
      dispatch(foodActions.loading(false));
    } catch (error) {
      dispatch(modalActions.id("Food Update Fail"));
      dispatch(foodActions.loading(false));
      dispatch(foodActions.errorMessage(error.message));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};
