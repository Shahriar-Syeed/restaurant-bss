import { createSlice } from "@reduxjs/toolkit";

const initialAdminStatistics = {
  employeesStatistics: [],
  tablesStatistics: [],
  foodsStatistics: [],
  ordersStatistics: [],
  loading: false,
  error: null,
};

const adminStatisticsSlice = createSlice({
  name: "adminStatistics",
  initialState: initialAdminStatistics,
  reducers: {
    getEmployeesStatistics(state, action) {
      state.employeesStatistics = action.payload;
    },
    getFoodsStatistics(state, action) {
      state.foodsStatistics = action.payload;
    },
    getTablesStatistics(state, action) {
      state.tablesStatistics = action.payload;
    },
    getOrdersStatistics(state, action) {
      state.ordersStatistics = action.payload;
    }, 
    loading(state, action) {
      state.loading = action.payload;
    },
    errorMessage(state, action) {
      state.error = action.payload;
    },
  },
});
export const adminStatisticsActions = adminStatisticsSlice.actions;
export default adminStatisticsSlice.reducer;
