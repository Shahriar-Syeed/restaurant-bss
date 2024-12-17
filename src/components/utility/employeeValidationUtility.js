const validateEmployeeEntry = (name, value, formData) => {
  let error = "";

  switch (name) {
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
      const emailRegex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!emailRegex.test(value)) {
        error = "Invalid email address.";
      }
      break;

    case "phoneNumber":
      const phoneRegex = /^[0-9]{11}$/;
      if (!value.trim()) {
        error = "Phone number is required.";
      } else if (!phoneRegex.test(value.trim().replace(/\D/g, ""))) {
        error = "Must be 11 digits.";
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
      const nidRegex = /^(?:\d{10}|\d{17})$/;
      if (!value) {
        error = "NID is required.";
      } else if (!nidRegex.test(value)) {
        error = "10 or 17 digits.";
      }
      break;
    case "password":
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!value.trim()) {
        error = "Password is required.";
      } else if (!passwordRegex.test(value)) {
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
