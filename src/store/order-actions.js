import { modalActions } from "./modal-slice.js";
import { orderActions } from "./order-slice.js";
import { customSelectActions } from "./custom-select-slice.js";
import { api } from "./axiosInstance.js";
export const getOrder = (perPage) => {
  return async (dispatch) => {
    dispatch(orderActions.setLoading(true));
    try {
      const response = await api.get(
        `Order/datatable?Page=1&Per_Page=${perPage}`
      );
      dispatch(orderActions.setOrderDataTable(response.data));
      dispatch(orderActions.setLoading(false));
    } catch (error) {
      dispatch(orderActions.setLoading(false));
      dispatch(orderActions.errorMessage(error.message));
      dispatch(modalActions.id("orderList"));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};

export const changeOrderStatus = (id, status) => {
  return async (dispatch) => {
    dispatch(orderActions.setLoading(true));
    const updatedStatus = { status: status };
    try {
      const response = await api.put(
        `Order/update-status/${id}`,
        updatedStatus
      );
      if (response.status === 200) {
        dispatch(orderActions.changeStatusOfOrder({ id, status }));
        dispatch(customSelectActions.setSelectedOption(null));
        dispatch(modalActions.id(null));
        dispatch(modalActions.close());
      }
      dispatch(orderActions.setLoading(false));
    } catch (error) {
      dispatch(modalActions.id("orderList"));
      dispatch(orderActions.setLoading(false));
      dispatch(orderActions.errorMessage(error.message));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};

export const openEditModal = (id, orderNo) => {
  return async (dispatch) => {
    dispatch(modalActions.id({ id: id, orderNumber: orderNo }));
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
      const response = await api.delete(`Order/delete/${id}`);
      if (response.status === 204) {
        dispatch(orderActions.removeOrderFromOrderDataTable(id));
      }
      dispatch(orderActions.setLoading(false));
    } catch (error) {
      dispatch(orderActions.setLoading(false));
      dispatch(modalActions.id("orderList"));
      dispatch(orderActions.errorMessage(error.message));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};
