import Button from "../UI/Button.jsx";
import EmployeeSelect from "../UI/EmployeeSelect.jsx";
import Modal from "../UI/Modal.jsx";
import defaultImage from "../../assets/default-image-preview.png";
import { useDispatch, useSelector } from "react-redux";
import { postAssignEmployeesTable } from "../../store/employee-tables-actions";
import { employeeSelectActions } from "../../store/employee-select-slice.js";
import apiUrl from "../../apiUrl/ApiUrl.jsx";

export default function AssignEmployeeModal({
  closeModal,
  tableInfoData,
}) {
  const dispatch = useDispatch();
  const selectedEmployees = useSelector(
    (state) => state.employeeSelect.selectedOption
  );
  const isOpen = useSelector((state) => state.modal.open);
  const employeesList = useSelector(
    (state) => state.employeeTables.nonAssignedEmployee
  );

  const info = { ...tableInfoData };

  const employeesToAssign = employeesList?.map(
    (employee) =>
      (employee = {
        value: employee.employeeId,
        label: employee.name,
        sendingValue: employee,
      })
  );

  function handleAssignEmployee(info) {
    const updatedSelected = selectedEmployees?.map(
      (employee) =>
        (employee = { employeeId: employee.employeeId, tableId: info.id })
    );
    dispatch(postAssignEmployeesTable(updatedSelected, info.id));
    dispatch(employeeSelectActions.setSelectedOption([]));
    closeModal();
  }

  return (
    <>
      <Modal open={isOpen} onClose={closeModal} className=" overflow-unset">
        <Button
          className="button-primary sm:px-3 sm:py-1.5 px-2 py-1 rounded-lg absolute right-3 top-3 font-extrabold border-solid border-2 border-primary"
          onClick={closeModal}
          type="button"
        >
          X
        </Button>

        <h1 className="text-center sm:text-xl font-bold mb-3">
          Assign Employee To a Table
        </h1>

        <div className="grid grid-col-6 lg:gap-4 md:gap-3.5 sm:gap-3 gap-2.5">
          <div className="place-self-center sm:col-end-3 col-start-1 col-end-7">
            <div className="sm:min-h-32 min-h-10 max-h-11 sm:max-w-40 max-w-14 rounded-lg overflow-hidden">
              <img
                src={
                  info.image !== ""
                    ? `${apiUrl.getTableImage}${info.image}`
                    : defaultImage
                }
                alt=""
                className="h-full rounded-lg "
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
            className="button-primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg lg:col-start-5 col-start-6 col-end-7 self-center"
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
