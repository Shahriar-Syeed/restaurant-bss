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

export default function TableAddPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedTableImage = useSelector(
    (state) => state.employeeTables.selectedTableImage
  );
  const errorMessage = useSelector((state) => state.employeeTables.error);
  const previewImage = useSelector((state)=> state.employeeTables.preview);

  const tableOption =[
    {value:'164594', label: '2 seats', sendingValue: 2},
    {value:'246164', label: '4 seats', sendingValue: 4},
    {value:'39798461', label: '6 seats', sendingValue: 6},
    {value:'45514', label: '8 seats', sendingValue: 8},
    {value:'5651697416', label: '12 seats', sendingValue: 12},
  ];
  // Modal
  const isOpen = useSelector((state) => state.modal.open);
  const isLoading = useSelector((state) => state.employeeTables.loading);

  function openModal() {
    dispatch(modalActions.open());
  }
  function closeModal() {
    dispatch(modalActions.close());
  }
  function onSelectFile(event){
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    // setSelectedEmployeeImage(event.target.files[0]);
    dispatch(employeeTablesActions.setSelectedTableImage(event.target.files[0]));
  }
  function handleDrop (event){
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      dispatch(employeeTablesActions.selectedEmployeeImage(event.dataTransfer.files[0]));
      event.dataTransfer.clearData();
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();

    // dispatch(loaderActions.show());

    const fetchData = new FormData(event.target);
    const data = Object.fromEntries(fetchData.entries());
    console.log('data', data);
    const result = await dispatch(createTable(data, selectedTableImage));
    console.log("result",result)
    if (result === 200) {
      navigate("../");
    }    
  }
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
      <Modal open={isOpen} onClose={closeModal}>
        <h1>Failed!</h1>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <p>Invalid Password or Username</p>
        )}
        <div className="modal-action p-2">
          <Button
            className="float-end button-primary px-4 py-2 rounded-lg"
            onClick={closeModal}
          >
            Close
          </Button>
        </div>
      </Modal>
    <PageHeader title='Add Table' />
    <form onSubmit={handleSubmit} className="bg-white">
      <div className="grid lg:grid-cols-3 lg:gap-4 gap-4 bg-white xl:p-10 lg:p-8 md:p-6 sm:p-4 p-3 rounded">
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
              name="image"
              labelClass="absolute top-0 bottom-0 left-0 right-0 opacity-0 z-40 cursor-pointer"
              onChange={onSelectFile}
            >{''}</Input>
            <img src={previewImage ? previewImage : defaultImage} className="h-40" />
          </div>
        </div>
        <div className="lg:col-start-1 lg:col-end-3 lg:row-start-1">
          <InputFloating name="tableNumber">Table Number</InputFloating>
        </div>
        
        <div className="lg:col-start-1 lg:col-span-2 lg:row-start-2">
          <CustomSelect
            name="numberOfSeats"
            label="Number of seats"
            options={tableOption}
          />
        </div>
       
        <div className="lg:col-start-1 lg:col-span-2">
          <Button
            type="submit"
            className="button-primary w-full py-2 text-white rounded "
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </form>
    </>
  );
}
