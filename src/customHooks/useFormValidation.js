import { useState } from "react";

export default function useFormValidation(initialState, validateInput, isNumericInput=[]) {
  const [formData, setFromData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched]= useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;


      let sanitizedValue= value;
      if(isNumericInput.includes(name)){
        sanitizedValue = value.replace(/\D/g,'');
      }
    
    setFromData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
    if(touched[name]){
      const error = validateInput(name, sanitizedValue);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error || '',
      }));
    }
  };

  const handleBlur = (e) =>{
    const {name, value}= e.target;

    setTouched((prev)=>({
      ...prev,
      [name]: true,
    }));

      const error = validateInput(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error || '',
      }));
  }

  const validateFields = () => {
    const finalErrors = {};
    const updateTouched = {};
    Object.keys(formData).forEach((field) => {
      const fieldError = validateInput(field, formData[field]);
      if (fieldError) {
        finalErrors[field] = fieldError;
      }
      updateTouched[field] = true;
    });
    setErrors(finalErrors);
    setTouched(updateTouched);
    return finalErrors;
  };
  const hasError = () => Object.values(errors).some((error) => error !== "");

  return { formData, errors, handleChange, handleBlur, validateFields, hasError };
}
