import { checkPhoneNumberExist } from "../../store/exist-phone-actions";



const validateEmployeeEntry = async (name, value, formData) => {
  let error = "";

  switch (name) {
    case "image":
      if(value.files.length === 0){
        error = "Upload an image.";
      }
      break;

    case "firstName":
      if (!value.trim()) {
        error = "First name is required.";
      } else if (value.trim().length < 2) {
        error = "Must be 2 characters.";
      } 
      break;
    case "userName":
      if (!value.trim()) {
        error = "User name is required.";
      } else if (value.trim().length < 2) {
        error = "Must be 2 characters.";
      } else if (value.trim().length > 10) {
        error = "10 char limit.";
      }
      break;

    case "middleName":
      if (!value.trim()) {
        error = "Middle name is required.";
      } else if (value.trim().length < 2) {
        error = "Must be 2 characters.";
      } else if (value.trim().length > 10) {
        error = "10 char limit.";
      }
      break;

    case "lastName":
      if (!value.trim()) {
        error = "Last name is required.";
      } else if (value.trim().length < 2) {
        error = "Must be 2 characters.";
      } else if (value.trim().length > 10) {
        error = "10 char limit.";
      }
      break;

    case "fatherName":
      if (!value.trim()) {
        error = "Father's name is required.";
      } else if (value.trim().length < 3) {
        error = "Must be 3 characters.";
      } else if (value.trim().length > 25) {
        error = "25 char limit.";
      }
      break;

    case "motherName":
      if (!value.trim()) {
        error = "Mother's name is required.";
      } else if (value.trim().length < 3) {
        error = "Must be 3 characters.";
      } else if (value.trim().length > 25) {
        error = "25 char limit.";
      }
      break;

    case "spouseName":
      if (!value.trim()) {
        error = "Name is required.";
      } else if (value.trim().length < 3) {
        error = "Must be 3 characters.";
      } else if (value.trim().length > 25) {
        error = "25 char limit.";
      }
      break;

    case "email":
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!/^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
        error = "Invalid email address.";
      }
      break;

    case "phoneNumber":

      if (!value.trim()) {
        error = "Phone number is required.";
      } else if (!/^[0-9]{11}$/.test(value.trim().replace(/\D/g, ""))) {
        error = "Must be 11 digits.";
      } else if(await checkPhoneNumberExist(value.trim())) {
        error = "Phone number already exists.";
      }
      break;

    case "gender":
      if (!value) {
        error = "Gender select please.";
      }
      break;

    case "designation":
      if (!value.trim()) {
        error = "Designation is required.";
      } else if (value.trim().length < 2) {
        error = "Must be 2 characters.";
      } else if (value.trim().length > 15) {
        error = "15 char limit.";
      }
      break;

    case "dob":
      if (!value) {
        error = "Date of Birth is required.";
      } else if (Date.now() - Date.parse(value) < 568025136000) {
        error = "Must be under 18 years.";
      }
      break;

    case "joinDate":
      if (!value) {
        error = "Date of Join is required.";
      } else if (Date.now() - Date.parse(value) <= 0) {
        error = "Date should be before today.";
      }
      break;

    case "nid":
      if (!value) {
        error = "NID is required.";
      } else if (!/^(?:\d{10}|\d{17})$/.test(value)) {
        error = "10 or 17 digits.";
      }
      break;
    case "password":
      if (!value.trim()) {
        error = "Password is required.";
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
        error = "8 chars include 1 letter & 1 number.";
      }
      break;
    case "confirmPassword":
      
      if (value !== formData?.password) {
        error = "Passwords do not match.";
      }
      break;

    default:
      break;
  }

  return error;
};

export default validateEmployeeEntry;
