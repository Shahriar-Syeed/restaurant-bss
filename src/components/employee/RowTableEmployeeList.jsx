import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal.jsx";
import { modalActions } from "../../store/modal-slice.js";
import defaultImage from "../../assets/default-image-preview.png";
import apiUrl from "../../apiUrl/ApiUrl.jsx";
import StarCircleIcon from "../svg/StarCircleIcon.jsx";

export default function RowTableEmployeeList({ deleteEmployee }) {
  const dispatch = useDispatch();
  const employeeList = useSelector(
    (state) => state.employees.employeeDataTable.data
  );
  const modalId = useSelector((state) => state.modal.id);
  const isOpen = useSelector((state) => state.modal.open);
  function openModal(id) {
    dispatch(modalActions.id(id));
    dispatch(modalActions.open());
  }
  function closeModal() {
    dispatch(modalActions.close());
  }
  return (
    <>
      {employeeList?.map((employee) => (
        <tr
          className="block sm:table-row odd:bg-white even:bg-gray-50 sm:border-b border-b-0 border-gray-700 p-1 shadow-md rounded-lg mb-2 sm:p-0 sm:rounded-none sm:shadow-none "
          key={employee.id}
        >
          {modalId === employee.id && (
            <Modal open={isOpen} onClose={closeModal}>
              <h1 className="md:text-xl mb-2">{`Do you want to delete employee ${
                employee.user.fullName
                  ? employee.user.fullName
                  : "of your restaurant"
              }!`}</h1>

              <div className="flex gap-2 flex-wrap justify-end p-2">
                <Button
                  className="float-end button__outline--primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg"
                  onClick={closeModal}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  className="float-end button-primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg"
                  onClick={() => deleteEmployee(employee.id)}
                  type="button"
                >
                  Delete
                </Button>
              </div>
            </Modal>
          )}
          <th
            scope="row"
            className="flex sm:table-cell justify-center md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1"
          >
            <img
              src={
                employee.user.image !== ""
                  ? `${apiUrl.getImage}${employee.user.image}`
                  : defaultImage
              }
              alt="Admin image"
              className="md:w-10 md:h-10 sm:w-9 sm:h-9 w-16 h-16 rounded-lg object-cover"
            />
          </th>
          <td
            className="flex items-center justify-center sm:table-cell md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 min-w-18 "
            data-th="Name: "
          >
            <div className="sm:grid flex grid-cols-[1fr_auto] gap-2">
              <span
                className="whitespace-nowrap overflow-clip text-ellipsis min-w-12 max-w-full inline-block"
                title={employee.user.fullName}
                tabIndex="0"
              >
                {employee.user.fullName}
              </span>

              <StarCircleIcon className="md:w-6 sm:w-5 w-4 cursor-pointer clickable-icon" />
            </div>
          </td>
          <td
            className="block sm:table-cell md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1"
            tabIndex="0"
            data-th="Email: "
            title={employee.user.email}
          >
            <span className="whitespace-nowrap overflow-clip text-ellipsis min-w-12 max-w-full inline-block">
              {employee.user.email}
            </span>
          </td>
          <td
            className="block sm:table-cell md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1"
            tabIndex="0"
            data-th="Phone: "
            title={employee.user.phoneNumber}
          >
            <span className="whitespace-nowrap overflow-clip text-ellipsis min-w-12 max-w-full inline-block">
              {employee.user.phoneNumber}
            </span>
          </td>
          <td
            className="block sm:table-cell md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1"
            tabIndex="0"
            data-th="Join Date: "
            title={employee.joinDate}
          >
            <span className="whitespace-nowrap overflow-clip text-ellipsis min-w-12 max-w-full inline-block">
              {employee.joinDate}
            </span>
          </td>
          <td
            className="block sm:table-cell md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 "
            tabIndex="0"
            data-th="Designation: "
            title={employee.designation}
          >
            <span className="whitespace-nowrap overflow-clip text-ellipsis min-w-12 max-w-full inline-block">
              {employee.designation}
            </span>
          </td>
          <td className="md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 flex justify-evenly sm:justify-start gap-1">
            <Link
              to={`/bss-restaurant-app/admin/employee/${employee.id}/employee-edit`}
              className="rounded-50 h-8 w-8 grid place-items-center hover:bg-stone-100 fill-green-700 hover:fill-green-600"
            >
              <svg
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="20px"
              >
                <path d="M3 10h11v2H3zm0-2h11V6H3zm0 8h7v-2H3zm15.01-3.13.71-.71c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-.71.71zm-.71.71-5.3 5.3V21h2.12l5.3-5.3z"></path>
              </svg>
            </Link>
            <Button
              textOnly
              className="rounded-50 h-8 w-8 grid place-items-center hover:bg-stone-100 fill-red-700 hover:fill-red-600"
              onClick={() => {
                openModal(employee.id, employee.fullName);
              }}
              type="button"
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
      ))}
    </>
  );
}
