import axios from "axios";
import { modalActions } from "./modal-slice.js";
import { orderActions } from "./order-slice.js";
import { customSelectActions } from "./custom-select-slice.js";
export const getOrder = ( perPage) => {
  return async (dispatch) => {
    dispatch(orderActions.setLoading(true));
    try {
      const response = await axios.get(
        `https://restaurantapi.bssoln.com/api/Order/datatable?Page=1&Per_Page=${perPage}`
      );
      console.log(response);
      dispatch(orderActions.setOrderDataTable(response.data));
      dispatch(orderActions.setLoading(false));
    } catch (error) {
      dispatch(orderActions.setLoading(false));
      console.log(error);
      dispatch(orderActions.errorMessage(error.message));
      dispatch(modalActions.id('orderList'))
      dispatch(modalActions.open());
      console.log(error);
      setTimeout(() => {
        dispatch(modalActions.close());
      }, 3000);
    }
  };
};

export const changeOrderStatus = (id, status) => {
  return async (dispatch) => {
    dispatch(orderActions.setLoading(true));
    const updatedStatus ={status:status};
    try {
      const response = await axios.put(
        `https://restaurantapi.bssoln.com/api/Order/update-status/${id}`, updatedStatus
      );
      console.log(response);
      if(response.status === 200){
        dispatch(orderActions.changeStatusOfOrder({id, status}));
        dispatch(customSelectActions.setSelectedOption(null));
        dispatch(modalActions.id(null));
        dispatch(modalActions.close());
      }
      dispatch(orderActions.setLoading(false));
    } catch (error) {
      dispatch(orderActions.setLoading(false));
      console.log(error);
      dispatch(orderActions.errorMessage(error.message));
      dispatch(modalActions.open());
      console.log(error);
      setTimeout(() => {
        dispatch(modalActions.close());
      }, 3000);
    }
  };
};

export const openEditModal = (id, orderNo) => {
  return async (dispatch) => {
    dispatch(modalActions.id({id:id, orderNumber: orderNo}));
    dispatch(orderActions.setOrderId(id));
    dispatch(modalActions.open());
  };
};

export const storeStatus = (status) => {
  return async (dispatch) => {
    dispatch(orderActions.setStatus(status));
  };
};

export const removeOrder = (id) => {
  return async (dispatch) => {
    dispatch(orderActions.setLoading(true));
    try {
      const response = await axios.delete(
        `https://restaurantapi.bssoln.com/api/Order/delete/${id}`
      );
      console.log(response);
      if(response.status === 204){
        dispatch(orderActions.removeOrderFromOrderDataTable(id));
      }
      dispatch(orderActions.setLoading(false));
    } catch (error) {
      dispatch(orderActions.setLoading(false));
      console.log(error);
      dispatch(orderActions.errorMessage(error.message));
      dispatch(modalActions.open());
      console.log(error);
      setTimeout(() => {
        dispatch(modalActions.close());
      }, 3000);
    }
  };
};
