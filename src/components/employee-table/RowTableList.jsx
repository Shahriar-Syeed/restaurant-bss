import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import { modalActions } from "../../store/modal-slice";
import Modal from "../UI/Modal";
import AssignEmployeeModal from "./AssignEmployeeModal";
import {
  deleteEmployeeFromTableDetail,
  getNonAssignEmployees,
} from "../../store/employee-tables-actions";
import { employeeSelectActions } from "../../store/employee-select-slice";

export default function RowEmployeeTableList({
  tableInfoData = {},
  handleDelete = () => {},
}) {
  const dispatch = useDispatch();
  console.log("tableInfoData", tableInfoData);
  const errorMessage = useSelector((state) => state.employeeTables.error);

  function handleWholeTableDelete() {
    if (modalTableId?.employeeTableId == "deleteWholeTable") {
      handleDelete(modalTableId?.id);
    }
    dispatch(modalActions.id(null));
    closeNormalModal();
  }

  function handleDeleteEmployeeFromTable() {
    dispatch(
      deleteEmployeeFromTableDetail(
        modalTableId?.id,
        modalTableId?.employeeTableId
      )
    );
    closeNormalModal();
  }
  function openDeleteConfirmationModal(id, employeeTableId) {
    dispatch(modalActions.id({ id: id, employeeTableId: employeeTableId }));
    dispatch(modalActions.open());
  }

  // Modal
  const isOpen = useSelector((state) => state.modal.open);
  const modalTableId = useSelector((state) => state.modal.id);

  function openModal(tableId) {
    dispatch(modalActions.open());
    dispatch(modalActions.id(tableId));
    dispatch(getNonAssignEmployees(tableId));
    console.log(tableId);
  }
  function closeModal() {
    dispatch(employeeSelectActions.setSelectedOption([]));
    dispatch(employeeSelectActions.setIsFocused(false));
    dispatch(modalActions.id(null));
    dispatch(modalActions.close());
  }
  function closeNormalModal() {
    dispatch(modalActions.id(null));
    dispatch(modalActions.close());
  }
  return (
    <>

      {modalTableId?.id === tableInfoData.id &&
        modalTableId?.employeeTableId !== "deleteWholeTable" && (
        <Modal open={isOpen}>
          <h1>Confirmation!</h1>
          <p>Are you sure you want to remove this employee from this table?</p>
          <div className="flex flex-wrap justify-end gap-1 p-2">
            <Button
              className="button__outline--primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg"
              onClick={closeNormalModal}
              type="button"
            >
              Close
            </Button>
            <Button
              className="button-primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg border-solid border-2 border-primary"
              onClick={() => handleDeleteEmployeeFromTable()}
              type="button"
            >
              Confirm
            </Button>
          </div>
        </Modal>
      )}
      {modalTableId?.id === tableInfoData.id &&
        modalTableId?.employeeTableId === "deleteWholeTable" && (
          <Modal open={isOpen}>
            <h1>Confirmation!</h1>
            <p>Are you sure you want to remove this table?</p>
            <div className="flex flex-wrap justify-end gap-1 p-2">
              <Button
                className="button__outline--primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg"
                onClick={closeNormalModal}
                type="button"
              >
                Close
              </Button>
              <Button
                className="button-primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg"
                onClick={() => handleWholeTableDelete(modalTableId.id)}
                type="button"
              >
                Confirm
              </Button>
            </div>
          </Modal>
        )}

      {!errorMessage && modalTableId === tableInfoData.id && (
        <AssignEmployeeModal
          closeModal={closeModal}
          tableInfoData={{ ...tableInfoData }}
        />
      )}
      <tr className="block sm:table-row odd:bg-white even:bg-gray-50 sm:border-b border-b-0 border-gray-700 p-1 shadow-md rounded-lg mb-2 sm:p-0 sm:rounded-none sm:shadow-none">
        <td
          scope="row"
          className="block sm:table-cell md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 break-words md:break-normal"
          data-th="Table Number: "
        >
          {tableInfoData.tableNumber}
        </td>
        <td
          className="block sm:table-cell md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 break-words md:break-normal"
          data-th="Table Number: "
        >
          {tableInfoData.numberOfSeats}
        </td>
        <td
          className="block sm:table-cell md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 break-words md:break-normal"
          data-block
          data-th="Employees: "
        >
          <ul className="sm:block flex flex-wrap justify-center gap-1">
            {tableInfoData?.employees?.map((emp) => (
              <li className="w-fit sm:w-auto" key={emp["employeeTableId"]}>
                <div className="inline-flex items-center whitespace-nowrap bg-stone-100 hover:bg-stone-200 rounded-2xl p-1 mb-1 ">
                  <span className="p-0.5">{emp.name}</span>
                  <Button
                    textOnly={true}
                    className="rounded-50 h-6 w-6 grid place-items-center text-stone-400 hover:text-red-500 stroke-transparent"
                    type="button"
                    onClick={() => {
                      openDeleteConfirmationModal(
                        tableInfoData.id,
                        emp.employeeTableId
                      );
                    }}
                  >
                    <svg
                      className="fill-current stroke-inherit"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      width="24px"
                    >
                      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                    </svg>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <Button
            className="rounded-50 h-7 w-7 sm:grid sm:place-items-center  text-teal-300 hover:text-teal-500 hover:bg-stone-200 p-0.5 mt-0.5"
            onClick={() => openModal(tableInfoData.id)}
            type="button"
          >
            <svg
              className="fill-current"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="24px"
            >
              <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path>
            </svg>
          </Button>
        </td>
        <td
          className="block sm:table-cell md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 break-words md:break-normal"
          data-th="Booking Status: "
        >
          {tableInfoData.isOccupied ? (
            <span className="text-red-800">Booked</span>
          ) : (
            <span className="text-green-800">Available</span>
          )}
        </td>
        <td className="md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 sm:table-cell flex justify-evenly  gap-1">
          <Button
            textOnly
            className="rounded-50 h-8 w-8 grid place-items-center hover:bg-stone-100 fill-red-700 hover:fill-red-600"
            onClick={() =>
              openDeleteConfirmationModal(tableInfoData.id, "deleteWholeTable")
            }
          >
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="fill-inherit"
              width="20px"
            >
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
            </svg>
          </Button>
        </td>
      </tr>
    </>
  );
}
