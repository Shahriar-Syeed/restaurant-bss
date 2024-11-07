import { createSlice } from "@reduxjs/toolkit";

const initialCart = {
  cartItem: {
    items: [],
  },
  selectedTableId: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    createCartItem(state, action) {
      state.cartItem = action.payload;
    },
    setSelectedTableId(state, action) {
      if(state.selectedTableId !== action.payload) {

        state.selectedTableId=action.payload ;
        state.cartItem = { ...state.cartItem, tableId: action.payload };
      }else{        
        state.selectedTableId = null;
        delete state.cartItem.tableId;
      } 

    },
    removeTableIdInCart(state) {
      delete state.cartItem.tableId;
      state.selectedTableId = null;
    },
    addFoodInCart(state, action) {
      const existingItemIndex = state.cartItem.items.findIndex(
        (item) => item.foodId === action.payload.foodId
      );

      if (existingItemIndex !== -1) {
        const updatedItem = {
          ...state.cartItem.items[existingItemIndex],
          quantity: state.cartItem.items[existingItemIndex].quantity + 1,
          totalPrice:
            (state.cartItem.items[existingItemIndex].quantity + 1) *
            state.cartItem.items[existingItemIndex].unitPrice,
        };
        state.cartItem.items[existingItemIndex] = updatedItem;
      } else {
        state.cartItem = {
          ...state.cartItem,
          items: [
            ...state.cartItem.items,
            {
              ...action.payload,
              foodPackageId: 0,
              quantity: 1,
              totalPrice: action.payload.unitPrice,
            },
          ],
        };
      }
      state.cartItem.amount = state.cartItem.items.reduce(
        (totalAmount, totalPriceEachItem) => totalAmount + totalPriceEachItem,
        0
      );
    },
    increaseFoodQuantityInCart(state, action) {
      const existingItemIndex = state.cartItem.items.findIndex(
        (item) => item.foodId === action.payload.foodId
      );

      if (existingItemIndex !== -1) {
        const updatedItem = {
          ...state.cartItem.items[existingItemIndex],
          quantity: state.cartItem.items[existingItemIndex].quantity + 1,
          totalPrice:
            (state.cartItem.items[existingItemIndex].quantity + 1) *
            state.cartItem.items[existingItemIndex].unitPrice,
        };
        state.cartItem.items[existingItemIndex] = updatedItem;
      }
      state.cartItem.amount = state.cartItem.items.reduce(
        (totalAmount, totalPriceEachItem) => totalAmount + totalPriceEachItem,
        0
      );
    },
    decreaseFoodQuantityInCart(state, action) {
      const existingItemIndex = state.cartItem.items.findIndex(
        (item) => item.foodId === action.payload.foodId
      );

      if (
        existingItemIndex !== -1 &&
        state.cartItem.items[existingItemIndex].quantity !== 1
      ) {
        const updatedItem = {
          ...state.cartItem.items[existingItemIndex],
          quantity: state.cartItem.items[existingItemIndex].quantity - 1,
          totalPrice:
            (state.cartItem.items[existingItemIndex].quantity - 1) *
            state.cartItem.items[existingItemIndex].unitPrice,
        };
        state.cartItem.items[existingItemIndex] = updatedItem;
      } else {
        state.cartItem.items = state.cartItem.items.filter(
          (item, index) =>
            item[index] !== state.cartItem.items[existingItemIndex]
        );
      }
      state.cartItem.amount = state.cartItem.items.reduce(
        (totalAmount, totalPriceEachItem) => totalAmount + totalPriceEachItem,
        0
      );
    },
    removeFoodInCart(state, action) {
      state.cartItem.items = state.cartItem.items.filter(
        (item) => item.foodId !== action.payload.foodId
      );
      state.cartItem.amount = state.cartItem.items.reduce(
        (totalAmount, totalPriceEachItem) => totalAmount + totalPriceEachItem,
        0
      );
    },
    loading(state, action) {
      state.loading = action.payload;
    },
    errorMessage(state, action) {
      state.error = action.payload;
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
