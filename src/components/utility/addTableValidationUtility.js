const validateTableEntry = (name, value) => {
  let error = "";

  switch (name) {
    case "tableNumber":
      if (!value.trim()) {
        error = "Table No is required.";
      } else if (value.trim().length !== 5) {
        error = "Must be 5 characters.";
      } else if (value.trim()[0]!== 'T' || value.trim()[1]!== 'B') {
        error = "start with 'TB'";
      }
      break;
      
    default:
      break;
  }

  return error;
};

export default validateTableEntry;
