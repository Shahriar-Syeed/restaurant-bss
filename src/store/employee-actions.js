import { employeeActions } from "./employee-slice";
import { modalActions } from "./modal-slice";
import { api } from "./axiosInstance";

export const getEmployees = (page, perPage) => {
  return async (dispatch) => {
    dispatch(employeeActions.loading(true)); 
    try {
      const response = await api.get(
        `Employee/datatable?Page=${page}&Per_Page=${perPage}`
      );
      if (response.status === 200) {
        dispatch(employeeActions.getEmployeesDataTable(response.data));
        dispatch(employeeActions.loading(false));
      }
    } catch (error) {
      dispatch(employeeActions.loading(false));
      dispatch(modalActions.id("Employees list get fail"));
      dispatch(employeeActions.errorMessage(error.message));
      dispatch(modalActions.open()); //
      console.error(error);

      setTimeout(() => {
        dispatch(modalActions.id(null)); 
        dispatch(modalActions.close()); 
      }, 3000);
    }
  };
};

export const deleteEmployee = (employeeId) => {
  return async (dispatch) => {
    dispatch(employeeActions.loading(true));
    try {
      const res = await api.delete(`Employee/delete/${employeeId}`);

      if (res.status === 204) {
        dispatch(employeeActions.removeEmployee(employeeId));
      }
      dispatch(employeeActions.loading(false));
    } catch (error) {
      dispatch(modalActions.id("Delete Employee Fail."));
      dispatch(employeeActions.loading(false));
      dispatch(employeeActions.errorMessage(error.message));
      dispatch(modalActions.open());
      console.log(error);
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};

export const createEmployee = (formData) => {
  return async (dispatch) => {
    dispatch(modalActions.close());
    dispatch(employeeActions.loading(true));
    const birthDateString = dateConvertToString(formData.dob);
    const dateOfJoinString = dateConvertToString(formData.joinDate);
    const updatedData = {
      ...formData,
      joinDate: dateOfJoinString,
      dob: birthDateString,
    };
    console.log("updatedData", updatedData);
    try {
      const response = await api.post("Employee/creat", updatedData);
      dispatch(employeeActions.setStatus(response.status));
      console.log("createResult", response);
      if (response.status === 200) {
        dispatch(modalActions.close());
        dispatch(employeeActions.showPreview(undefined));
        dispatch(employeeActions.loading(false));
      }
      return response;
    } catch (error) {
      dispatch(modalActions.id("Employee create error!"));
      dispatch(employeeActions.loading(false));
      dispatch(employeeActions.errorMessage(error.message));
      dispatch(modalActions.open());
      console.log(error);
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};

export const editEmployeeDesignation = (id, data) => {
  return async (dispatch) => {
    dispatch(employeeActions.loading(true));
    try {
      const response = await api.put(
        `https://restaurantapi.bssoln.com/api/Employee/update/${id}`,
        { designation: data }
      );
      console.log(response);
      if (response.status === 200 || response.status === 204) {
        dispatch(
          employeeActions.changeEmployeeDesignation({
            id: id,
            designation: data,
          })
        );
        dispatch(employeeActions.loading(false));
        return Promise.resolve("success");
      }
    } catch (error) {
      dispatch(modalActions.id("Edit Employee Fail"));
      dispatch(employeeActions.errorMessage(error.message));
      dispatch(modalActions.open());
      console.log(error);
      setTimeout(() => {
        dispatch(modalActions.close());
        dispatch(modalActions.id(null));
      }, 3000);
    }
  };
};

export const nullStatus = () => {
  return async (dispatch) => {
    dispatch(employeeActions.setStatus(null));
  };
};

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
};

export function dateConvertToString(date) {
  if (!date) return "";
  const newDate = new Date(date);
  if (isNaN(newDate)) return "";
  const dateString = newDate.toISOString();
  return dateString;
}
