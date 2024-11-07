import axios from "axios";
import { employeeActions } from "./employee-slice";
import { modalActions } from "./modal-slice";
export const getEmployees = (page, perPage) => {
  return async (dispatch) => {
    dispatch(employeeActions.loading(true));
    try {
      const response = await axios.get(
        `https://restaurantapi.bssoln.com/api/Employee/datatable?Page=${page}&Per_Page=${perPage}`
      );
      console.log(response);
      dispatch(employeeActions.getEmployeesDataTable(response.data));
      dispatch(employeeActions.getEmployeesRow(response.data.data));
      dispatch(employeeActions.loading(false));
    } catch (error) {
      dispatch(employeeActions.loading(false));
      console.log(error);
      dispatch(employeeActions.errorMessage(error.message));
      dispatch(modalActions.open());
      console.log(error);
      setTimeout(() => {
        dispatch(modalActions.close());
      }, 3000);
    }
  };
};

export const deleteEmployee = (employeeId) => {
  return async (dispatch) => {
    dispatch(employeeActions.loading(true));
    try {
      const res = await axios.delete(
        `https://restaurantapi.bssoln.com/api/Employee/delete/${employeeId}`
      );

      if (res.status === 204) {
        dispatch(employeeActions.removeEmployee(employeeId));
      }
      dispatch(employeeActions.loading(false));
    } catch (error) {
      dispatch(employeeActions.loading(false));
      dispatch(employeeActions.errorMessage(error.message));
      dispatch(modalActions.open());
      console.log(error);
      setTimeout(() => {
        dispatch(modalActions.close());
      }, 3000);
    }
  };
};

export const createEmployee = (formData, imageFile) => {
  return async (dispatch) => {
    dispatch(employeeActions.loading(true));
    const birthDateString = dateConvertToString(formData.dob);
    const dateOfJoinString = dateConvertToString(formData.joinDate);
    const updatedData = {
      ...formData,
      joinDate: dateOfJoinString,
      dob: birthDateString,
    };
    try {
  
      if (imageFile) {
        const base64String = await convertBase64(imageFile);
        console.log(base64String);
        const finalData = {
          ...updatedData,
          image: imageFile?.name || "",
          base64: base64String ? base64String : "",
        };
        const response = await axios.post(
          "https://restaurantapi.bssoln.com/api/Employee/create",
          finalData
        );
        if (response.status === 200) {
          dispatch(employeeActions.showPreview(undefined));
          dispatch(employeeActions.selectedEmployeeImage(undefined));
          dispatch(employeeActions.loading(false));
          return 200;
        }
      }
    } catch (error) {
      dispatch(employeeActions.loading(false));
      dispatch(employeeActions.errorMessage(error.message));
      dispatch(modalActions.open());
      console.log(error);
      setTimeout(() => {
        dispatch(modalActions.close());
      }, 3000);
    }
  };
};

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export function dateConvertToString(date) {
  if (!date) return "";
  const newDate = new Date(date);
  if (isNaN(newDate)) return "";
  const dateString = newDate.toISOString();
  return dateString;
}
