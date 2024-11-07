import { useEffect } from "react";
import Input from "../UI/Input.jsx";
import defaultImage from "../../assets/default-image-preview.png";
import InputFloating from "../UI/InputFloating.jsx";
import CustomSelect from "../UI/CustomSelect.jsx";
import Button from "../UI/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "../../store/employee-slice.js";

export default function EmployeeForm({ handleSubmit, handleDrop, onSelectFile, selectedEmployeeImage }) {

  const dispatch = useDispatch();
  const previewImage = useSelector((state) => state.employees.preview);

  const genderOptions = [
    { value: "male", label: "Male", sendingValue: 1 },
    { value: "female", label: "Female", sendingValue: 2 },
    { value: "other", label: "Other", sendingValue: 0 },
  ];


  useEffect(() => {
    if (!selectedEmployeeImage) {
      // setPreview(undefined);
      dispatch(employeeActions.showPreview(undefined));
      return;
    }
    const objectUrl = URL.createObjectURL(selectedEmployeeImage);
    // setPreview(objectUrl);
    dispatch(employeeActions.showPreview(objectUrl));

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedEmployeeImage, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-12 lg:gap-4 md:gap-3.5 sm:gap-3 gap-2.5 bg-white xl:p-10 lg:p-8 md:p-6 sm:p-4 p-3 rounded">
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
            />
            {/* <img src={preview ? preview : defaultImage} className="h-36" /> */}
            <img src={previewImage ? previewImage : defaultImage} className="h-36" />
          </div>
        </div>
        <div className="lg:col-start-1 lg:col-end-9 lg:row-start-1">
          <InputFloating name="firstName">First Name</InputFloating>
        </div>
        <div className="lg:col-start-1 lg:col-end-9 lg:row-start-2">
          <InputFloating name="middleName">Middle Name</InputFloating>
        </div>
        <div className="lg:col-start-1 lg:col-end-9 lg:row-start-3">
          <InputFloating name="lastName">Last Name</InputFloating>
        </div>
        <div className="lg:col-span-4">
          <InputFloating name="fatherName">Father Name</InputFloating>
        </div>
        <div className="lg:col-span-4">
          <InputFloating name="motherName">Mother Name</InputFloating>
        </div>
        <div className="lg:col-span-4">
          <InputFloating name="spouseName">Spouse Name</InputFloating>
        </div>
        <div className="lg:col-span-4">
          <InputFloating name="designation">Designation</InputFloating>
        </div>
        <div className="lg:col-span-4">
          <InputFloating name="email">Email</InputFloating>
        </div>
        <div className="lg:col-span-4">
          <InputFloating name="phoneNumber">Phone Number</InputFloating>
        </div>
        <div className="lg:col-span-3">
          <CustomSelect
            name="genderId"
            label="Gender"
            options={genderOptions}
            // onChange={handleGenderChange}
          />
        </div>
        <div className="lg:col-span-3">
          <InputFloating type="date" name="dob">
            Date of Birth
          </InputFloating>
        </div>
        <div className="lg:col-span-3">
          <InputFloating type="date" name="joinDate">
            Date of Join
          </InputFloating>
        </div>
        <div className="lg:col-span-3">
          <InputFloating type="number" name="nid">
            NID
          </InputFloating>
        </div>
        <div className="lg:col-span-12">
          <Button
            type="submit"
            className="button-primary w-full py-2 text-white rounded "
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </form>
  );
}
