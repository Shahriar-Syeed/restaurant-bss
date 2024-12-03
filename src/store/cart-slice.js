import { createSlice } from "@reduxjs/toolkit";

const initialCart = {
  cartItem: {
    items: [],
  },
  selectedTableId: null,
  selectedTableNumber: null,
  success: false,
  loading: false,
  error: null,
  showCartDrawer: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    setCartItem(state, action) {
      state.cartItem = action.payload;
    },
    setSelectedTableId(state, action) {
      if(state.selectedTableId !== action.payload) {

        state.selectedTableId=action.payload ;
        state.cartItem = { ...state.cartItem, tableId: action.payload };
      }else if(action.payload===null){
        state.selectedTableId = null;
        state.cartItem.tableId && delete state.cartItem.tableId;
      }else{        
        state.selectedTableId = null;
        delete state.cartItem.tableId;
      } 

    },
    setSelectedTableNumber(state, action) { 
      if(state.selectedTableNumber === action.payload) {
        state.selectedTableNumber = null;
      }
      else{
        state.selectedTableNumber = action.payload;
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
              foodPackageId: null,
              quantity: 1,
              totalPrice: action.payload.unitPrice,
            },
          ],
        };
      }
      state.cartItem.amount = state.cartItem.items.reduce(
        (totalAmount, totalPriceEachItem) => totalAmount + totalPriceEachItem.totalPrice,
        0
      );
    },
    increaseFoodQuantityInCart(state, action) {
      const existingItemIndex = state.cartItem.items.findIndex(
        (item) => item.foodId === action.payload
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
        (totalAmount, totalPriceEachItem) => totalAmount + totalPriceEachItem.totalPrice,
        0
      );
    },
    decreaseFoodQuantityInCart(state, action) {
      const existingItemIndex = state.cartItem.items.findIndex(
        (item) => item.foodId === action.payload
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
          (item) =>
            item !== state.cartItem.items[existingItemIndex]
        );
      }
      state.cartItem.amount = state.cartItem.items.reduce(
        (totalAmount, totalPriceEachItem) => totalAmount + totalPriceEachItem.totalPrice,
        0
      );
    },
    removeFoodInCart(state, action) {
      state.cartItem.items = state.cartItem.items.filter(
        (item) => item.foodId !== action.payload
      );
      state.cartItem.amount = state.cartItem.items.reduce(
        (totalAmount, totalPriceEachItem) => totalAmount + totalPriceEachItem.totalPrice,
        0
      );
    },
    loading(state, action) {
      state.loading = action.payload;
    },
    errorMessage(state, action) {
      state.error = action.payload;
    },
    setCartDrawer(state){
      state.showCartDrawer = state.payload;
    },
    toggleCartDrawer(state){
      state.showCartDrawer = !state.showCartDrawer;
    },
    setSuccess(state, action){
      state.success = action.payload;
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
