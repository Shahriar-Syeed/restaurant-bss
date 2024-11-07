import { createSlice } from "@reduxjs/toolkit";

const initialEmployeeTables = {
  employeeTablesDataTable: {},
  preview: undefined,
  loading: false,
  error: null,
  selectedTableImage: undefined,
  nonAssignedEmployee: [],
};

const employeeTablesSlice = createSlice({
  name: "employeeTables",
  initialState: initialEmployeeTables,
  reducers: {
    getEmployeeTablesDataTable(state, action) {
      state.employeeTablesDataTable = action.payload;
    },
    getEmployeeTablesRow(state, action) {
      state.employeeTableRowData = action.payload;
    },
    showPreview(state, action) {
      state.preview = action.payload;
    },

    setAssignEmployeeAndTableDetails(state, action) {
      state.assignEmployeeAndTableDetails = action.payload;
    },

    removeEmployeeFromTable(state, action) {

      state.employeeTablesDataTable = {
        ...state.employeeTablesDataTable,
        data: state.employeeTablesDataTable.data.map((table) => {
          if (table.id === action.payload.id) {
            return {
              ...table,
              employees: table.employees.filter(
                (employee) =>
                  employee.employeeTableId !== action.payload.employeeTableId
              ),
            };
          } else {
            return table;
          }
        }),
      };
    },
    addEmployeeInTable(state, action) {

      state.employeeTablesDataTable = {
        ...state.employeeTablesDataTable,
        data: state.employeeTablesDataTable.data.map((table) => {
          if (table.id === action.payload.id) {
            return {
              ...table,
              employees: table.employees.concat(
                action.payload.employeeInfo
              ),
            };
          } else {
            return table;
          }
        }),
      };
      console.log(state.employeeTablesDataTable, action.payload);
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
    setErrorMessage(state, action) {
      state.error = action.payload;
    },

    removeEmployeeTable(state, action) {
      state.employeeTableRowData = state.employeeTableRowData.filter(
        (employeeTable) => employeeTable.id !== action.payload
      );
      state.employeeTablesDataTable = {
        ...state.employeeTablesDataTable,
        data: state.employeeTablesDataTable.data.filter(
          (employeeTable) => employeeTable.id !== action.payload
        ),
      };
    },
    setSelectedTableImage(state, action) {
      state.selectedTableImage = action.payload;
    },
    setNonAssignEmployee(state, action) {
      state.nonAssignedEmployee = action.payload;
    },
  },
});
export const employeeTablesActions = employeeTablesSlice.actions;
export default employeeTablesSlice.reducer;
