import axios from "axios";
import { cartActions } from "./cart-slice.js";
import { modalActions } from "./modal-slice.js";

export const setTableIdInCart = (tableId, tableNumber) => {
  return async (dispatch) => {
    try{

      const res = await dispatch(cartActions.setSelectedTableId(tableId));
       dispatch(cartActions.setSelectedTableNumber(tableNumber));
    }catch(error){
      console.log(error);
    }

  };
};
export const addFood = (foodId, unitPrice, foodName, foodImage) => {
  return async (dispatch) => {
    const res = await dispatch(
      cartActions.addFoodInCart({ foodId, unitPrice, foodName, foodImage })
    );
  };
};
export const addFoodQuantity = (foodId) => {
  return async (dispatch) => {
    const res = await dispatch(
      cartActions.increaseFoodQuantityInCart(foodId)
    );
  };
};
export const subtractFoodQuantity = (foodId) => {
  return async (dispatch) => {
    const res = await dispatch(
      cartActions.decreaseFoodQuantityInCart(foodId)
    );
  };
};
export const removeFoodItem = (foodId) => {
  return async (dispatch) => {
    const res = await dispatch(
      cartActions.removeFoodInCart(foodId)
    );
  };
};

export const toggleCartDrawer = () => {
  return async (dispatch) => {
    const res = await dispatch(cartActions.toggleCartDrawer());
  };
};
export const closeCartDrawer = () => {
  return async (dispatch) => {
    const res = await dispatch(cartActions.setCartDrawer(false));
  };
};
export const openCartDrawer = () => {
  return async (dispatch) => {
    const res = await dispatch(cartActions.setCartDrawer(true));
  };
};

export const createOrder = (data) => {
  return async (dispatch) => {
    dispatch(cartActions.loading(true));
    console.log(data)
    try {
      const res = await axios.post(
        `https://restaurantapi.bssoln.com/api/Order/create`,data
      );
      console.log(res);
      if (res.status === 204 || res.status === 200) {
        dispatch(cartActions.setCartItem({items:[]}));
        dispatch(cartActions.setSelectedTableId(null));
        dispatch(cartActions.setSelectedTableNumber(null));
        dispatch(cartActions.setSuccess(true));
        dispatch(modalActions.id("Success"));
        dispatch(modalActions.open());
        setTimeout(() => {
          dispatch(modalActions.close());
          dispatch(modalActions.id(null));
          dispatch(cartActions.setSuccess(false));

        }, 3000);
      }
      dispatch(cartActions.loading(false));
    } catch (error) {
      dispatch(cartActions.loading(false));
      dispatch(cartActions.errorMessage(error.message));
      dispatch(modalActions.id('cart-error'));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};


