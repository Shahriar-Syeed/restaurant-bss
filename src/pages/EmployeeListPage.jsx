import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination.jsx";
import PageHeader from "../components/PageHeader.jsx";
import HeadTable from "../components/HeadTable.jsx";
import RowTableEmployeeList from "../components/employee/RowTableEmployeeList.jsx";
import { useEffect, useState } from "react";

import Modal from "../components/UI/Modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal-slice";
import Button from "../components/UI/Button.jsx";
import { deleteEmployee, getEmployees } from "../store/employee-actions.js";
import Loading from "../components/loader/Loading.jsx";

const HEADING = [
  { id: "image", label: "Image" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "joiningDate", label: "Join Date" },
  { id: "designation", label: "Designation" },
  { id: "action", label: "Action" },
];

export default function EmployeeListPage() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const employeesDataTable = useSelector(
    (state) => state.employees.employeeDataTable
  );
  const loading = useSelector((state) => state.employees.loading);
  const errorMess = useSelector((state) => state.employees.error);
  // Modal
  const modalId = useSelector(state=>  state.modal.id);

  const isOpen = useSelector((state) => state.modal.open);
  function closeModal() {
    dispatch(modalActions.close());
  }

  useEffect(() => {
    dispatch(getEmployees(pageNumber, itemsPerPage));
  }, [pageNumber, itemsPerPage, dispatch]);
  function handleDelete(employeeId) {

    closeModal();
    dispatch(deleteEmployee(employeeId));
  }
  

  return (
    <>

      {modalId === 'employee-list-fail' && <Modal open={isOpen} onClose={closeModal}>
        <h1>Failed fetching data!</h1>
        {errorMess ? <p>{errorMess}</p> : <p>Invalid Password or Username</p>}
        <div className="modal-action p-2">
          <Button
            className="float-end button-primary px-4 py-2 rounded-lg"
            type="button"
            onClick={closeModal}
          >
            Close
          </Button>
        </div>
      </Modal>}
      
      <PageHeader
        title="All Employee"
        buttonLabel="ADD EMPLOYEE"
        buttonOnClick={() =>
          navigate("/admin/employee/employee-add")
        }
      />

      <div className="overflow-x-auto shadow-md sm:rounded-t-lg">
        <table className="w-full text-left rtl:text-right text-gray-900 text-xs sm:text-sm ">
          <thead className="text-xs text-primary uppercase bg-gray-50 hidden sm:table-header-group">
            <tr>
              {HEADING?.map((heading) => (
                <HeadTable key={heading.id}>{heading.label}</HeadTable>
              ))}
            </tr>
          </thead>
          <tbody className="block sm:table-row-group text-center sm:text-start ">
            <RowTableEmployeeList
              deleteEmployee={handleDelete}
            />
          </tbody>
        </table>
      </div>
      <Pagination
        className="bg-white rounded-b-lg"
        totalPages={employeesDataTable.totalPages}
        totalRecord={employeesDataTable.totalRecords}
        onChangePageNumber={setPageNumber}
        onChangeItemsPerPage={setItemsPerPage}
      />
      {loading && <Loading fullHeightWidth/>}
    </>
  );
}
