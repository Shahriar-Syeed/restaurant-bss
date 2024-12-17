import { modalActions } from "./modal-slice.js";
import { adminStatisticsActions } from "./adminStatistics-slice.js";
import { api } from "./axiosInstance.js";

export const getAdminStatistics = () => {
  return async (dispatch) => {
    dispatch(adminStatisticsActions.loading(true));
    try {
      const employeeResponse = await api.get(`Employee/get`);
      const tableResponse = await api.get(`Table/get`);
      const foodResponse = await api.get(`Food/get`);
      const orderResponse = await api.get(`Order/get`);
      if (employeeResponse.status === 200) {
        dispatch(
          adminStatisticsActions.getEmployeesStatistics(employeeResponse.data)
        );
      }
      if (tableResponse.status === 200) {
        dispatch(
          adminStatisticsActions.getTablesStatistics(tableResponse.data)
        );
      }
      if (foodResponse.status === 200) {
        dispatch(adminStatisticsActions.getFoodsStatistics(foodResponse.data));
      }
      if (orderResponse.status === 200) {
        dispatch(
          adminStatisticsActions.getOrdersStatistics(orderResponse.data)
        );
      }

      dispatch(adminStatisticsActions.loading(false));
    } catch (error) {
      dispatch(modalActions.id("Statistic Getting fail"));
      dispatch(adminStatisticsActions.loading(false));
      dispatch(adminStatisticsActions.errorMessage(error.message));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};

// export const deleteFood = (foodId) => {
//   return async (dispatch) => {
//     dispatch(foodActions.loading(true));
//     try {
//       const res = await axios.delete(
//         `https://restaurantapi.bssoln.com/api/Food/delete/${foodId}`
//       );

//       if (res.status === 204) {
//         dispatch(foodActions.removeFood(foodId));
//       }
//       dispatch(foodActions.loading(false));
//     } catch (error) {
//       dispatch(foodActions.loading(false));
//       dispatch(foodActions.errorMessage(error.message));
//       dispatch(modalActions.open());
//       console.log(error);
//       setTimeout(() => {
//         dispatch(modalActions.close());
//       }, 3000);
//     }
//   };
// };

// export const createFood = (formData) => {
//   return async (dispatch) => {
//     dispatch(foodActions.loading(true));
//     console.log("discount price NAN", formData);

//     const updatedData = {
//       ...formData,
//       discount: Number(formData.discount),
//       discountPrice: Number(formData.discountPrice),
//       price: Number(formData.price),
//       discountType: Number(formData.discountType),
//     };
//     try {
//       const response = await axios.post(
//         "https://restaurantapi.bssoln.com/api/Food/create",
//         updatedData
//       );
//       if (response.status === 200) {
//         dispatch(foodActions.loading(false));
//         dispatch(foodActions.showPreview(undefined));
//         dispatch(foodActions.selectedFoodImage(undefined));
//       }
//       return response;
//     } catch (error) {
//       dispatch(modalActions.id("foodAddFail"));
//       dispatch(foodActions.loading(false));
//       dispatch(foodActions.errorMessage(error.message));
//       dispatch(modalActions.open());
//       console.log(error);
//       setTimeout(() => {
//         dispatch(modalActions.id(null));
//         dispatch(modalActions.close());
//       }, 3000);
//     }
//   };
// };

// export const getSingleFoodItem = (id) => {
//   return async (dispatch) => {
//     dispatch(foodActions.loading(true));
//     try {
//       const response = await axios.get(
//         `https://restaurantapi.bssoln.com/api/Food/get/${id}`
//       );
//       console.log(response);
//       dispatch(foodActions.setFoodItem(response.data));
//       dispatch(foodActions.loading(false));
//     } catch (error) {
//       dispatch(modalActions.id("getSingleFoodFail"));
//       dispatch(foodActions.loading(false));
//       dispatch(foodActions.errorMessage(error.message));
//       dispatch(modalActions.open());
//       setTimeout(() => {
//         dispatch(modalActions.close());
//         dispatch(modalActions.id(null));
//       }, 3000);
//     }
//   };
// };

// export const updateSingleFoodItem = (id, data) => {
//   return async (dispatch) => {
//     dispatch(foodActions.loading(true));
//     console.log(id,data);
//     try {
//       const response = await axios.put(
//         `https://restaurantapi.bssoln.com/api/Food/update/${id}`, data
//       );
//       console.log(response);
//       if (response.status === 200 || response.status === 204) {
//         dispatch(foodActions.updateFood({id,data}))
//         dispatch(foodActions.loading(false));
//         dispatch(foodActions.showPreview(undefined));
//         dispatch(foodActions.selectedFoodImage(undefined));
//         return Promise.resolve("success");
//       }
//       dispatch(foodActions.loading(false));
//     } catch (error) {
//       dispatch(modalActions.id("updateSingleFoodFail"));
//       dispatch(foodActions.loading(false));
//       dispatch(foodActions.errorMessage(error.message));
//       dispatch(modalActions.open());
//       setTimeout(() => {
//         dispatch(modalActions.close());
//         dispatch(modalActions.id(null));
//       }, 3000);
//     }
//   };
// };
