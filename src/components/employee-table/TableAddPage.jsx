import Input from "../UI/Input";
import InputFloating from "../UI/InputFloating";
import defaultImage from "../../assets/default-image-preview.png";
import CustomSelect from "../UI/CustomSelect.jsx";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button.jsx";
import PageHeader from "../PageHeader.jsx";
import { modalActions } from "../../store/modal-slice.js";
import Loading from "../loader/Loading.jsx";
import Modal from "../UI/Modal.jsx";
import { useNavigate } from "react-router-dom";
import { employeeTablesActions } from "../../store/employee-tables-slice.js";
import { createTable } from "../../store/employee-tables-actions.js";
import { useEffect } from "react";
import validateTableEntry from "../utility/addTableValidationUtility.js";
import useFormValidation from "../../customHooks/useFormValidation.js";

export default function TableAddPage() {
  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    validateFields,
    hasError,
  } = useFormValidation(
    {
      numberOfSeats: "",
    },
    validateTableEntry,
    []
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedTableImage = useSelector(
    (state) => state.employeeTables.selectedTableImage
  );
  const errorMessage = useSelector((state) => state.employeeTables.error);
  const previewImage = useSelector((state) => state.employeeTables.preview);

  const tableOption = [
    { value: "164594", label: "2 seats", sendingValue: 2 },
    { value: "246164", label: "4 seats", sendingValue: 4 },
    { value: "39798461", label: "6 seats", sendingValue: 6 },
    { value: "45514", label: "8 seats", sendingValue: 8 },
    { value: "5651697416", label: "12 seats", sendingValue: 12 },
  ];
  // Modal
  const modalId = useSelector((state) => state.modal.id);
  const isOpen = useSelector((state) => state.modal.open);
  const isLoading = useSelector((state) => state.employeeTables.loading);

  function openModal() {
    dispatch(modalActions.open());
  }
  function closeModal() {
    dispatch(modalActions.id(null));
    dispatch(modalActions.close());
  }
  function onSelectFile(event) {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    // setSelectedEmployeeImage(event.target.files[0]);
    dispatch(
      employeeTablesActions.setSelectedTableImage(event.target.files[0])
    );
  }
  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      dispatch(
        employeeTablesActions.selectedEmployeeImage(event.dataTransfer.files[0])
      );
      event.dataTransfer.clearData();
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();

    console.log(event, event.target.tableNumber.value);
    if (
      event.target.tableNumber.value === "" ||
      event.target.numberOfSeats.value === "0"
    ) {
      dispatch(modalActions.id("empty values"));
      openModal();
      return;
    }
    const validationError = validateFields();
    if (!hasError() && Object.keys(validationError).length === 0) {
      const fetchData = new FormData(event.target);
      const data = Object.fromEntries(fetchData.entries());
      console.log("data", data);
      try {
        const result = await dispatch(createTable(data, selectedTableImage));
        if (result === 200) {
          navigate("../");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log(errors)
  useEffect(() => {
    if (!selectedTableImage) {
      // setPreview(undefined);
      dispatch(employeeTablesActions.showPreview(undefined));
      return;
    }
    const objectUrl = URL.createObjectURL(selectedTableImage);
    // setPreview(objectUrl);
    dispatch(employeeTablesActions.showPreview(objectUrl));

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedTableImage, dispatch]);

  return (
    <>
      {isLoading && <Loading />}
      {modalId === 'create table fail' && errorMessage && (
        <Modal open={isOpen} onClose={closeModal}>
          <h1 className="text-red-700 font-bold text-lg">Failed!</h1>
          {errorMessage ? <p>{errorMessage}</p> : <p>Submit fail!</p>}
          <div className="modal-action p-2">
            <Button
              className="float-end button-primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg border-solid border-2 border-primary"
              onClick={closeModal}
              type="button"
            >
              Close
            </Button>
          </div>
        </Modal>
      )}
      {modalId === "empty values" && (
        <Modal open={isOpen} onClose={closeModal}>
          <h1 className="text-red-700 font-bold text-lg">Submit Failed!</h1>
          <p>Please fill up table number and number of seats.</p>
          <div className=" p-2">
            <Button
              className="float-end button-primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg"
              onClick={closeModal}
              type="button"
            >
              Okay
            </Button>
          </div>
        </Modal>
      )}
      <PageHeader
        title="Add Table"
        buttonLabel="Back"
        buttonOnClick={() => navigate("../")}
      />
      <form onSubmit={handleSubmit} className="bg-white">
        <div className="grid lg:grid-cols-3 lg:gap-5 gap-5 bg-white xl:p-10 lg:p-8 md:p-6 sm:p-4 p-3 rounded">
          <div
            className="lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-span-3 border-dashed border border-gray-200 hover:border-gray-400 relative min-h-36 rounded"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="h-full flex items-center justify-center">
              <Input
                type="file"
                hidden
                id="image"
                labelClass="absolute top-0 bottom-0 left-0 right-0 opacity-0 z-30 cursor-pointer"
                onChange={onSelectFile}
              >
                {""}
              </Input>
              <div className="overflow-hidden h-40 rounded-lg">
                <img
                  src={previewImage ? previewImage : defaultImage}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-start-1 lg:col-end-3 lg:row-start-1">
            <InputFloating
              id="tableNumber"
              errorClassName="absolute text-xs text-red-600 py-0.5 ps-3"
              error={errors?.tableNumber}
              onChange={ handleChange}
              onBlur={handleBlur}
            >
              Table Number
            </InputFloating>
          </div>

          <div className="lg:col-start-1 lg:col-span-2 lg:row-start-2">
            <CustomSelect
              id="numberOfSeats"
              label="Number of seats"
              options={tableOption}
              maximumHeight="60"
            />
          </div>

          <div className="lg:col-start-1 lg:col-span-2">
            <Button
              type="submit"
              className="button-primary w-full py-2 text-white rounded "
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
