import { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar.jsx";
import InputFloating from "../components/UI/InputFloating.jsx";
import Button from "../components/UI/Button.jsx";
import CustomSelect from "../components/UI/CustomSelect.jsx";
import Input from "../components/UI/Input.jsx";
import useFormValidation from "../customHooks/useFormValidation.js";
import {
  convertBase64,
  dateConvertToString,
} from "../store/employee-actions.js";
import { modalActions } from "../store/modal-slice.js";
import { registerActions } from "../store/register-slice.js";
import { createUser } from "../store/registration-actions.js";
import Modal from "../components/UI/Modal.jsx";
import defaultImage from "../assets/default-image-preview.png";
import Loading from "../components/loader/Loading.jsx";
import validateEmployeeEntry from "../components/utility/employeeValidationUtility.js";
import BackIcon from "../components/svg/BackIcon.jsx";

export default function RegistrationPage() {
  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    validateFields,
    hasError,
  } = useFormValidation(
    {
      userName: "",
      firstName: "",
      middleName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      spouseName: "",
      email: "",
      phoneNumber: "",
      dob: "",
      nid: "",
      password: "",
      confirmPassword: "",
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
  const loading = useSelector((state) => state.register.loading);
  const previewImage = useSelector((state) => state.register.preview);
  // Modal
  const modalId = useSelector((state) => state.modal.id);
  const isOpen = useSelector((state) => state.modal.open);

  function openModal() {
    const validationError = validateFields();
    if (!hasError() && Object.keys(validationError).length === 0) {
      dispatch(modalActions.id("user-create-confirmation"));
      dispatch(modalActions.open());
    }
  }

  function closeModal() {
    dispatch(modalActions.close());
    dispatch(modalActions.id(null));
  }

  function onSelectFile(event) {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    imageCaptureRef.current = file;
    dispatch(registerActions.showPreview(URL.createObjectURL(file)));
  }
  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      // dispatch(registerActions.setSelectedEmployeeImage(event.dataTransfer.files[0]));
      const file = event.dataTransfer.files[0];
      imageCaptureRef.current = file;
      dispatch(registerActions.showPreview(URL.createObjectURL(file)));
      event.dataTransfer.clearData();
    }
  }
  async function handleSubmit(event) {
    event?.preventDefault();
    const fetchData = new FormData(formRef.current);
    const data = Object.fromEntries(fetchData.entries());
    delete data.confirmPassword;
    let updatedData = {
      ...data,
      dob: dateConvertToString(data?.dob),
      genderId: Number(data?.genderId),
    };
    console.log(data, updatedData);
    if (imageCaptureRef.current) {
      const base64 = await convertBase64(imageCaptureRef.current);

      updatedData = {
        ...updatedData,
        image: imageCaptureRef.current.name,
      };
      console.log(updatedData);
    } else {
      console.log(updatedData);
      updatedData = { ...updatedData, image: "" };
    }
    try {
      const response = await dispatch(createUser(updatedData));
      console.log("registerActions", response);
      switch (response?.status) {
        case 200:
          imageCaptureRef.current = null;
          navigate("/login");
          break;
        default:
          break;
      }
    } catch (registerError) {
      console.log(registerError.message);
    }
  }

  useEffect(() => {
    if (!imageCaptureRef.current) {
      dispatch(registerActions.showPreview(undefined));
      return;
    }
    console.log(imageCaptureRef.current);
    const objectUrl = URL.createObjectURL(imageCaptureRef.current);

    dispatch(registerActions.showPreview(objectUrl));

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageCaptureRef, dispatch]);
  return (
    <>
      {modalId === "user-create-confirmation" && (
        <Modal open={isOpen} onClose={closeModal}>
          <h3 className="md:text-xl mb-3">
            Are you sure you want to create this employee?
          </h3>

          <div className="modal-action p-2 flex justify-end gap-2 flex-wrap">
            <Button
              className="button__outline--primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg"
              onClick={closeModal}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="button-primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg"
              type="button"
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </div>
        </Modal>
      )}
      <Navbar className="flex gap-2 sm:gap-3 flex-wrap">
        <NavLink
          to="/login"
          className="button__outline--primary sm:px-6 sm:py-3 es:px-3 es:py-1.5 px-2 py-1 rounded-md sm:text-lg es:text-base text-sm font-semibold hover:border-white"
        >
          Login
        </NavLink>
        <Button
          className=" button__outline--primary sm:px-6 sm:py-3 es:px-3 es:py-1.5 px-2 py-1 rounded-md sm:text-lg es:text-base text-sm font-semibold hover:border-white"
          onClick={() => navigate("../")}
        >
          <BackIcon className="w-3 md:w-3.5 lg:w-5" />
          <span className="hidden es:inline">Back</span>
        </Button>
      </Navbar>
      <section className="min-h-lvh bg--page xl:p-20 lg:p-16 md:p-10">
        <div className="bg-white xl:p-10 lg:p-8 md:p-6 sm:p-4 p-3 rounded relative">
          <h1 className="2xl:text-3xl xl:text-2xl lg:text-xl text-md mb-3 text-center font-bold">
            Please write information correctly.
          </h1>
          <div>
            <form ref={formRef}>
              <div className="grid lg:grid-cols-12 lg:gap-6 gap-5 bg-white xl:p-10 lg:p-8 md:p-6 sm:p-4 p-3 rounded pt-3">
                <div
                  className="lg:col-start-9 lg:col-end-13 lg:row-span-4 border-dashed border border-gray-200 hover:border-gray-400 relative min-h-36 rounded"
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
                      labelClass="absolute top-0 bottom-0 left-0 right-0 opacity-0 z-30 cursor-pointer"
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
                    id="userName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.userName}
                    errorClassName="absolute text-xs text-red-600 py-0.5 ps-3"
                  >
                    User Name
                  </InputFloating>
                </div>
                <div className="lg:col-start-1 lg:col-end-9 lg:row-start-2">
                  <InputFloating
                    id="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.firstName}
                    errorClassName="absolute text-xs text-red-600 py-0.5 ps-3"
                  >
                    First Name
                  </InputFloating>
                </div>
                <div className="lg:col-start-1 lg:col-end-9 lg:row-start-3">
                  <InputFloating
                    id="middleName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.middleName}
                    errorClassName="absolute text-xs text-red-600 py-0.5 ps-3"
                  >
                    Middle Name
                  </InputFloating>
                </div>
                <div className="lg:col-start-1 lg:col-end-9 lg:row-start-4">
                  <InputFloating
                    id="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.lasttName}
                    errorClassName="absolute text-xs text-red-600 py-0.5 ps-3"
                  >
                    Last Name
                  </InputFloating>
                </div>
                <div className="lg:col-span-4">
                  <InputFloating
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    errorClassName="absolute text-xs text-red-600 py-0.5 ps-3"
                  >
                    Email
                  </InputFloating>
                </div>
                <div className="lg:col-span-4">
                  <InputFloating
                    id="phoneNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.phoneNumber}
                    error={errors.phoneNumber}
                    errorClassName="absolute text-xs text-red-600 py-0.5 ps-3"
                  >
                    Phone Number
                  </InputFloating>
                </div>

                <div className="lg:col-span-4">
                  <InputFloating
                    id="fatherName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.fatherName}
                    errorClassName="absolute text-xs text-red-600 py-0.5 ps-3"
                  >
                    Father Name
                  </InputFloating>
                </div>
                <div className="lg:col-span-4">
                  <InputFloating
                    id="motherName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.motherName}
                    errorClassName="absolute text-xs text-red-600 py-0.5 ps-3"
                  >
                    Mother Name
                  </InputFloating>
                </div>
                <div className="lg:col-span-4">
                  <InputFloating
                    id="spouseName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.spouseName}
                    errorClassName="absolute text-xs text-red-600 py-0.5 ps-3"
                  >
                    Spouse Name
                  </InputFloating>
                </div>
                <div className="lg:col-span-4">
                  <CustomSelect
                    id="genderId"
                    name="genderId"
                    label="Gender"
                    options={genderOptions}
                    maximumHeight="60"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="lg:col-span-3">
                  <InputFloating
                    type="date"
                    id="dob"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.dob}
                    errorClassName="absolute text-xs text-red-600 py-0.5 ps-3"
                  >
                    Date of Birth
                  </InputFloating>
                </div>
                <div className="lg:col-span-3">
                  <InputFloating
                    type="number"
                    id="nid"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.nid}
                    errorClassName="absolute text-xs text-red-600 py-0.5 ps-3"
                  >
                    NID
                  </InputFloating>
                </div>
                <div className="lg:col-span-3">
                  <InputFloating id="facebook">Facebook</InputFloating>
                </div>
                <div className="lg:col-span-3">
                  <InputFloating id="instagram">Instagram</InputFloating>
                </div>
                <div className="lg:col-span-6">
                  <InputFloating
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    errorClassName="absolute text-xs text-red-600 py-0.5 ps-3"
                  >
                    Password
                  </InputFloating>
                </div>
                <div className="lg:col-span-6">
                  <InputFloating
                    id="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.confirmPassword}
                    errorClassName="absolute text-xs text-red-600 py-0.5 ps-3"
                  >
                    Confirm Password
                  </InputFloating>
                </div>
                <div className="lg:col-span-12">
                  <Button
                    type="button"
                    className="button-primary w-full py-2 text-white rounded"
                    onClick={openModal}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {loading && <Loading />}
    </>
  );
}
