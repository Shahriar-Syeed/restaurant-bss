import Button from "../UI/Button.jsx";
// import CustomSelect from "../UI/CustomSelect.jsx";
import EmployeeSelect from "../UI/EmployeeSelect.jsx";
import Modal from "../UI/Modal.jsx";
import defaultImage from "../../assets/default-image-preview.png";
import { useDispatch, useSelector } from "react-redux";
import { postAssignEmployeesTable } from "../../store/employee-tables-actions";

// import { customSelectActions } from "../../store/custom-select-slice";
import { employeeSelectActions } from "../../store/employee-select-slice.js";

export default function AssignEmployeeModal({
  // open,
  closeModal,
  tableInfoData,
}) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.employeeTables.loading);
  const selectedEmployees = useSelector(
    (state) => state.employeeSelect.selectedOption
  );
  // const assignEmployeeAndTableDetails = useSelector(state=>state.employeeTables.assignEmployeeAndTableDetails)
  const isOpen = useSelector((state) => state.modal.open);
  const employeesList = useSelector(
    (state) => state.employeeTables.nonAssignedEmployee
  );

  const error = useSelector((state) => state.employeeTables.error);

  // console.log(tableInfoData);
  const info = { ...tableInfoData };
  // console.log("info", info);

  const employeesToAssign = employeesList?.map(
    (employee) =>
      (employee = {
        value: employee.employeeId,
        label: employee.name,
        sendingValue: employee,
      })
  );

  function handleAssignEmployee(info) {
    console.log("selectedEmployees", selectedEmployees);
    const updatedSelected = selectedEmployees?.map(
      (employee) =>
        (employee = { employeeId: employee.employeeId, tableId: info.id })
    );
    console.log("info", info);
    dispatch(postAssignEmployeesTable(updatedSelected, info.id));
    dispatch(employeeSelectActions.setSelectedOption([]));
    closeModal();
  }

  return (
    <>
      {error && <p>{error.message}</p>}
      <Modal open={isOpen} onClose={closeModal} className=" overflow-unset">
        <Button
          className="button-primary sm:px-3 sm:py-1.5 px-2 py-1 rounded-lg absolute right-3 top-3 font-extrabold"
          onClick={closeModal}
          type="button"
        >
          X
        </Button>

        <h1 className="text-center sm:text-xl font-bold mb-3">
          Assign Employee To a Table
        </h1>

        <div className="grid grid-col-6 lg:gap-4 md:gap-3.5 sm:gap-3 gap-2.5">
          <div className="flex items-center justify-center sm:col-end-3 col-start-1 col-end-7">
            <div className=" sm:h-36 h-16 rounded-lg">
              <img
                src={defaultImage}
                alt=""
                className=" h-full sm:max-w-full object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="sm:col-start-4 col-start-1 col-end-7 flex flex-col justify-center gap-3 text-center lg:text-left">
            <h2 className="sm:text-xl font-semibold lg:mb-3">
              Table Number: {info.tableNumber}
            </h2>
            <h2 className="sm:text-xl font-semibold">
              Seats Number: {info.numberOfSeats}
            </h2>
          </div>

          <div className="col-start-1 lg:col-end-5 col-end-6">
            <EmployeeSelect
              name="employeeId"
              label="Select Employee"
              options={employeesToAssign}
              selectOptionHandle
            />
          </div>
          <Button
            className="button-primary lg:px-4 lg:py-2 px-3 py-1.5 rounded-lg lg:col-start-5 col-start-6 col-end-7 self-center sm:text-base text-xs"
            onClick={() => handleAssignEmployee(info)}
            type="button"
          >
            Assign
          </Button>
        </div>
      </Modal>
    </>
  );
}
