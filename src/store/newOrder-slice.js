import { createSlice } from "@reduxjs/toolkit";

const initialNewOrder = {
  foodDataTable:{},
  newOrderRowData: [],
  tablesForNewOrder:[],
  selectedFoodImage: undefined,
  preview: undefined,
  loading: false,
  error: null,
  lastPage: "",
};

const newOrderSlice = createSlice({
  name: "newOrder",
  initialState: initialNewOrder,
  reducers: {
    getNewOrderDataTable(state, action) {
      state.foodDataTable = action.payload;
    },
    getNewOrderRow(state, action) {
      state.newOrderRowData = action.payload;
    },
    showPreview(state, action) {
      state.preview = action.payload;
    },
    selectedFoodImage(state, action) {
      state.selectedFoodImage = action.payload;
    },
    loading(state, action) {
      state.loading = action.payload;
    },   
    errorMessage(state, action) {
      state.error = action.payload;
    },
    setLastPag(state, action) {
      state.lastPage = action.payload;
    },

    removeFood(state, action) {
      state.newOrderRowData = state.newOrderRowData.filter(
        (food) => food.id !== action.payload
      );
    },
  },
});
export const foodActions = newOrderSlice.actions;
export default newOrderSlice.reducer;