import { createSlice } from "@reduxjs/toolkit";

const initialEmployees = {
  employeeDataTable:{},
  employeesRowData: [],
  selectedEmployeeImage: undefined,
  preview: undefined,
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState: initialEmployees,
  reducers: {
    getEmployeesDataTable(state, action) {
      state.employeeDataTable = action.payload;
    },
    getEmployeesRow(state, action) {
      state.employeesRowData = action.payload;
    },
    showPreview(state, action) {
      state.preview = action.payload;
    },
    selectedEmployeeImage(state, action) {
      state.selectedEmployeeImage = action.payload;
    },
    loading(state, action) {
      state.loading = action.payload;
    },   
    errorMessage(state, action) {
      state.error = action.payload;
    },

    removeEmployee(state, action) {
      state.employeesRowData = state.employeesRowData.filter(
        (employee) => employee.id !== action.payload
      );
    },
  },
});
export const employeeActions = employeeSlice.actions;
export default employeeSlice.reducer;
