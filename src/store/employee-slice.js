import { createSlice } from "@reduxjs/toolkit";

const initialEmployees = {
  employeeDataTable: {},
  selectedEmployeeImage: undefined,
  preview: undefined,
  status: null,
  isPhoneNoExist: false,
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
    setStatus(state, action) {
      state.status = action.payload;
    },
    showPreview(state, action) {
      state.preview = action.payload;
    },
    setSelectedEmployeeImage(state, action) {
      state.selectedEmployeeImage = action.payload;
    },
    loading(state, action) {
      state.loading = action.payload;
    },
    setExistPhone(state, action) {
      state.isPhoneNoExist = action.payload;
    },
    errorMessage(state, action) {
      state.error = action.payload;
    },
    removeEmployee(state, action) {
      state.employeeDataTable = {
        ...state.employeeDataTable,
        data: state.employeeDataTable.data.filter(
          (employee) => employee.id !== action.payload
        ),
      };
    },
    changeEmployeeDesignation(state, action) {
      state.employeeDataTable.data = state.employeeDataTable.data.map((item) =>
        item.id === action.payload.id
          ? { ...item, designation: action.payload.designation }
          : item
      );
    },
  },
});
export const employeeActions = employeeSlice.actions;
export default employeeSlice.reducer;
