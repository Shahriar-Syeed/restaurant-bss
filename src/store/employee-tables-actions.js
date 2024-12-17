import { employeeTablesActions } from "./employee-tables-slice.js";
import { modalActions } from "./modal-slice.js";
import { convertBase64 } from "./employee-actions.js";
import { api } from "./axiosInstance.js";
export const getEmployeeTables = (page, perPage) => {
  return async (dispatch) => {
    dispatch(employeeTablesActions.setLoading(true));
    try {
      const response = await api.get(
        `Table/datatable?Page=${page}&Per_Page=${perPage}`
      );
      dispatch(employeeTablesActions.getEmployeeTablesDataTable(response.data));
      dispatch(employeeTablesActions.getEmployeeTablesRow(response.data.data));
      dispatch(employeeTablesActions.setLoading(false));
    } catch (error) {
      dispatch(employeeTablesActions.setLoading(false));
      dispatch(employeeTablesActions.setErrorMessage(error.message));
      dispatch(modalActions.id("Table List Getting Fail"));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(employeeTablesActions.setErrorMessage(undefined));
      }, 3000);
    }
  };
};

export const deleteEmployeeTable = (employeeTableId) => {
  return async (dispatch) => {
    dispatch(employeeTablesActions.setLoading(true));
    try {
      const res = await api.delete(`Table/delete/${employeeTableId}`);
      if (res.status === 204 || res.status === 200) {
        dispatch(employeeTablesActions.removeEmployeeTable(employeeTableId));
        dispatch(employeeTablesActions.setLoading(false));
      }
    } catch (error) {
      dispatch(modalActions.id("Table Employee Delete Fail"));
      dispatch(employeeTablesActions.setLoading(false));
      dispatch(employeeTablesActions.setErrorMessage(error.message));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
        dispatch(employeeTablesActions.setErrorMessage(undefined));
      }, 3000);
    }
  };
};

export const createTable = (formData, imageFile) => {
  return async (dispatch) => {
    dispatch(employeeTablesActions.setLoading(true));

    const updatedData = {
      ...formData,
      numberOfSeats: Number(formData.numberOfSeats),
    };
    try {
      let base64String = "";
      if (imageFile) {
        base64String = await convertBase64(imageFile);
      }
      const finalData = {
        ...updatedData,
        image: imageFile?.name || "",
        base64: base64String ? base64String : "",
      };
      const response = await api.post("Table/create", finalData);
      if (response.status === 200) {
        dispatch(employeeTablesActions.setLoading(false));
        dispatch(employeeTablesActions.showPreview(undefined));
        dispatch(employeeTablesActions.setSelectedTableImage(undefined));
        return 200;
      }
    } catch (error) {
      dispatch(modalActions.id("Fail to Create Table."));
      dispatch(employeeTablesActions.setLoading(false));
      dispatch(employeeTablesActions.setErrorMessage(error.message));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};

export const getNonAssignEmployees = (tableId) => {
  return async (dispatch) => {
    dispatch(employeeTablesActions.setLoading(true));
    try {
      const res = await api.get(`Employee/non-assigned-employees/${tableId}`);
      if (res.status === 200) {
        dispatch(employeeTablesActions.setNonAssignEmployee(res.data));
        dispatch(employeeTablesActions.setLoading(false));
      }
    } catch (error) {
      dispatch(modalActions.id("Get NonAssign Employee Fail"));
      dispatch(employeeTablesActions.setLoading(false));
      dispatch(employeeTablesActions.setErrorMessage(error.message));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(employeeTablesActions.setErrorMessage(undefined));
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};

export const deleteEmployeeFromTableDetail = (id, employeeTableId) => {
  return async (dispatch) => {
    dispatch(employeeTablesActions.setLoading(true));
    try {
      const res = await api.delete(`EmployeeTable/delete/${employeeTableId}`);
      if (res.status === 204 || res.status === 200) {
        dispatch(
          employeeTablesActions.removeEmployeeFromTable({ id, employeeTableId })
        );
        dispatch(employeeTablesActions.setLoading(false));
      }
    } catch (error) {
      dispatch(modalActions.id("Delete Employee Table Fail"));
      dispatch(employeeTablesActions.setLoading(false));
      dispatch(employeeTablesActions.setErrorMessage(error.message));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.id(null));
        dispatch(employeeTablesActions.setErrorMessage(undefined));
        dispatch(modalActions.close());
      }, 3000);
    }
  };
};

export const postAssignEmployeesTable = (data, id) => {
  return async (dispatch) => {
    dispatch(employeeTablesActions.setLoading(true));

    try {
      const updatedData = [...data];

      const response = await api.post(
        "EmployeeTable/create-range",
        updatedData
      );
      if (response.status === 200) {
        const employeeTableRes = await api.get("EmployeeTable/get");
        const employeeIds = data.map((item) => item.employeeId);
        const employeeInfo = employeeTableRes.data
          .filter(
            (value) =>
              employeeIds.includes(value.employee.employeeId) &&
              value.table.tableId === id
          )
          ?.map((item) => ({
            employeeTableId: item.employeeTableId,
            employeeId: item.employee.employeeId,
            name: item.employee.name,
          }));

        dispatch(
          employeeTablesActions.addEmployeeInTable({ id, employeeInfo })
        );

        dispatch(employeeTablesActions.setLoading(false));
      }
    } catch (error) {
      dispatch(modalActions.id("Assign Employee Fail"));
      dispatch(employeeTablesActions.setLoading(false));
      dispatch(employeeTablesActions.setErrorMessage(error.message));
      dispatch(modalActions.open());
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};
