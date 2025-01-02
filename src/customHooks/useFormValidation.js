import { useState } from "react";

export default function useFormValidation(
  initialState,
  validateInput,
  isNumericInput = []
) {
  const [formData, setFromData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    let sanitizedValue = value;
    if (isNumericInput.includes(name)) {
      sanitizedValue = value.replace(/\D/g, "");
    }

    setFromData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
    if (touched[name]) {
      const error = validateInput(
        name,
        sanitizedValue,
        formData
      );

      if (error instanceof Promise) {
        error.then((resolvedError) => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: resolvedError || "",
          }));
        });
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error || "",
        }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    const error = validateInput(name, value, formData );
    console.log(error);
    if (error instanceof Promise) {
      error.then((resolvedError) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: resolvedError || "",
        }));
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error || "",
      }));
    }
  };
  const validateFields = async () => {
    const finalErrors = {};
    const updatedTouched = {};

    // Collect promises if validateInput is asynchronous.
    const validationPromises = Object.keys(formData).map((field) => {
      updatedTouched[field] = true;
      const fieldError = validateInput(field, formData[field], formData);

      if (fieldError instanceof Promise) {
        return fieldError.then((resolvedError) => {
          if (resolvedError) finalErrors[field] = resolvedError;
        });
      } else if (fieldError) {
        finalErrors[field] = fieldError;
      }
    });

    // Await all validations.
    await Promise.all(validationPromises);

    setErrors(finalErrors);
    setTouched(updatedTouched);

    return finalErrors;
  };
 
  const hasError = () => Object.values(errors).some((error) => error !== "");

  return {
    formData,
    errors,
    handleChange,
    handleBlur,
    validateFields,
    hasError,
  };
}
