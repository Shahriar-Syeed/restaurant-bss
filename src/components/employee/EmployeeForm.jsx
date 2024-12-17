import { useEffect, useRef } from "react";
import Input from "../UI/Input.jsx";
import defaultImage from "../../assets/default-image-preview.png";
import InputFloating from "../UI/InputFloating.jsx";
import CustomSelect from "../UI/CustomSelect.jsx";
import Button from "../UI/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "../../store/employee-slice.js";
import Modal from "../UI/Modal.jsx";
import { modalActions } from "../../store/modal-slice.js";
import { useNavigate } from "react-router-dom";
import {
  convertBase64,
  createEmployee,
  nullStatus,
} from "../../store/employee-actions.js";
import Loading from "../loader/Loading.jsx";
import useFormValidation from "../../customHooks/useFormValidation.js";
import validateEmployeeEntry from "../utility/employeeValidationUtility.js";

export default function EmployeeForm() {
  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    validateFields,
    hasError,
  } = useFormValidation(
    {
      firstName: "",
      middleName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      spouseName: "",
      email: "",
      phoneNumber: "",
      designation: "",
      dob: "",
      joinDate: "",
      nid: "",
    },
    validateEmployeeEntry,
    ["phoneNumber", "nid"]
  );
  const formRef = useRef();

  const imageCaptureRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genderOptions = [
    { value: "male", label: "Male", sendingValue: 1 },
    { value: "female", label: "Female", sendingValue: 2 },
    { value: "other", label: "Other", sendingValue: 0 },
  ];
  const loading = useSelector((state) => state.employees.loading);
  const previewImage = useSelector((state) => state.employees.preview);
  // Modal
  const modalId = useSelector((state) => state.modal.id);
  const isOpen = useSelector((state) => state.modal.open);

  function openModal() {
    const validationError = validateFields();
    if (!hasError() && Object.keys(validationError).length === 0) {
      dispatch(modalActions.id("employee-create-confirmation"));
      dispatch(modalActions.open());
    }
  }

  function closeModal() {
    dispatch(modalActions.close());
    dispatch(modalActions.id(null));
  }

  useEffect(() => {
    dispatch(nullStatus());
    return () => dispatch(nullStatus());
  }, [dispatch]);

  function onSelectFile(event) {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    imageCaptureRef.current = file;
    dispatch(employeeActions.showPreview(URL.createObjectURL(file)));
  }
  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      // dispatch(employeeActions.setSelectedEmployeeImage(event.dataTransfer.files[0]));
      const file = event.dataTransfer.files[0];
      imageCaptureRef.current = file;
      dispatch(employeeActions.showPreview(URL.createObjectURL(file)));
      event.dataTransfer.clearData();
    }
  }
  async function handleSubmit(event) {
    event?.preventDefault();

    const fetchData = new FormData(formRef.current);
    const data = Object.fromEntries(fetchData.entries());
    console.log(data);
    let updatedData = { ...data };
    if (imageCaptureRef.current) {
      const base64 = await convertBase64(imageCaptureRef.current);

      updatedData = {
        ...data,
        image: imageCaptureRef.current.name,
        base64: base64,
      };
      console.log(updatedData);
    } else {
      console.log(updatedData);
      updatedData = { ...data, image: "", base64: "" };
    }
    const response = await dispatch(createEmployee(updatedData));

    switch (response?.status) {
      case 200:
        imageCaptureRef.current = null;
        navigate("../employee-list");
        break;
      case 204:
        imageCaptureRef.current = null;
        navigate("../employee-list");
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (!imageCaptureRef.current) {
      dispatch(employeeActions.showPreview(undefined));
      return;
    }
    console.log(imageCaptureRef.current);
    const objectUrl = URL.createObjectURL(imageCaptureRef.current);

    dispatch(employeeActions.showPreview(objectUrl));

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageCaptureRef, dispatch]);

  return (
    <>
      <form ref={formRef}>
        {modalId === "employee-create-confirmation" && (
          <Modal open={isOpen} onClose={closeModal}>
            <h3 className="md:text-xl mb-3">
              Are you sure you want to create this employee?
            </h3>

            <div className="modal-action p-2 flex justify-end gap-2 flex-wrap">
              <Button
                className="button__outline--primary sm:py-2 sm:px-4 py-1.5 px-3 rounded-lg"
                onClick={closeModal}
                type="button"
              >
                Cancel
              </Button>
              <Button
                className="button-primary sm:py-2 sm:px-4 py-1.5 px-3 rounded-lg border-solid border-2 border-primary"
                type="button"
                onClick={handleSubmit}
              >
                Confirm
              </Button>
            </div>
          </Modal>
        )}
        <div className="grid lg:grid-cols-12 lg:gap-6 gap-5 bg-white xl:p-10 lg:p-8 md:p-6 sm:p-4 p-3 rounded">
          <div
            className="lg:col-start-9 lg:col-end-13 lg:row-span-3 border-dashed border border-gray-200 hover:border-gray-400 relative min-h-36 rounded"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="h-full flex items-center justify-center">
              <Input
                type="file"
                hidden
                required
                id="image"
                name="image"
                labelClass="absolute top-0 bottom-0 left-0 right-0 opacity-0 z-40 cursor-pointer"
                onChange={onSelectFile}
              >{``}</Input>
              <div className="max-w-36 h-36 overflow-hidden rounded-lg">
                <img
                  src={previewImage || defaultImage}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-start-1 lg:col-end-9 lg:row-start-1 relative">
            <InputFloating
              id="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              First Name
            </InputFloating>
            {errors?.firstName && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-3">
                {errors?.firstName}
              </span>
            )}
          </div>
          <div className="lg:col-start-1 lg:col-end-9 lg:row-start-2 relative">
            <InputFloating
              id="middleName"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Middle Name
            </InputFloating>
            {errors?.middleName && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-3">
                {errors?.middleName}
              </span>
            )}
          </div>
          <div className="lg:col-start-1 lg:col-end-9 lg:row-start-3 relative">
            <InputFloating
              id="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Last Name
            </InputFloating>
            {errors?.lastName && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-3">
                {errors?.lastName}
              </span>
            )}
          </div>
          <div className="lg:col-span-4 relative">
            <InputFloating
              id="fatherName"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Father Name
            </InputFloating>
            {errors?.fatherName && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-3">
                {errors?.fatherName}
              </span>
            )}
          </div>
          <div className="lg:col-span-4">
            <InputFloating
              id="motherName"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Mother Name
            </InputFloating>
            {errors?.motherName && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-3">
                {errors?.motherName}
              </span>
            )}
          </div>
          <div className="lg:col-span-4 relative">
            <InputFloating
              id="spouseName"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Spouse Name
            </InputFloating>
            {errors?.spouseName && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-3">
                {errors?.spouseName}
              </span>
            )}
          </div>
          <div className="lg:col-span-4 relative">
            <InputFloating
              id="designation"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Designation
            </InputFloating>
            {errors?.designation && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-3">
                {errors?.designation}
              </span>
            )}
          </div>
          <div className="lg:col-span-4 relative">
            <InputFloating
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Email
            </InputFloating>
            {errors?.email && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-3">
                {errors?.email}
              </span>
            )}
          </div>
          <div className="lg:col-span-4 relative">
            <InputFloating
              id="phoneNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={formData.phoneNumber}
            >
              Phone Number
            </InputFloating>
            {errors?.phoneNumber && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-3">
                {errors?.phoneNumber}
              </span>
            )}
          </div>
          <div className="lg:col-span-3 relative">
            <CustomSelect
              id="genderId"
              label="Gender"
              options={genderOptions}
              maximumHeight="60"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors?.genderId && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-3">
                {errors?.genderId}
              </span>
            )}
          </div>
          <div className="lg:col-span-3 relative">
            <InputFloating
              type="date"
              id="dob"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Date of Birth
            </InputFloating>
            {errors?.dob && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-3">
                {errors?.dob}
              </span>
            )}
          </div>
          <div className="lg:col-span-3 relative">
            <InputFloating
              type="date"
              id="joinDate"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Date of Join
            </InputFloating>
            {errors?.joinDate && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-3">
                {errors?.joinDate}
              </span>
            )}
          </div>
          <div className="lg:col-span-3 relative">
            <InputFloating
              type="number"
              id="nid"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              NID
            </InputFloating>
            {errors?.nid && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-3">
                {errors?.nid}
              </span>
            )}
          </div>
          <div className="lg:col-span-12">
            <Button
              type="button"
              className="button-primary w-full py-2 text-white rounded"
              onClick={openModal}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </form>
      {loading && <Loading fullHeightWidth />}
    </>
  );
}
