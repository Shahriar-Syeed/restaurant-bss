import { createSlice } from "@reduxjs/toolkit";

const initialFoods = {
  foodDataTable: {},
  selectedFoodImage: undefined,
  preview: undefined,
  loading: false,
  error: null,
  singleFoodItem: {},
};

const foodSlice = createSlice({
  name: "foods",
  initialState: initialFoods,
  reducers: {
    getFoodsDataTable(state, action) {
      state.foodDataTable = action.payload;
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
    setFoodItem(state, action) {
      state.singleFoodItem = action.payload;
    },

    removeFood(state, action) {
      state.foodDataTable = {
        ...state.foodDataTable,
        data: state.foodDataTable.data.filter(
          (food) => food.id !== action.payload
        ),
      };
    },
    updateFood(state, action) {
      state.foodDataTable = {
        ...state.foodDataTable,
        data: state.foodDataTable.data.map(
          (food) => food.id === action.payload.id ? {id: action.payload.id, ...action.payload.data}: food
        ),
      };
    },
  },
});
export const foodActions = foodSlice.actions;
export default foodSlice.reducer;
