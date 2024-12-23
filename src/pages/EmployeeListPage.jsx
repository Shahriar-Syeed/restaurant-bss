import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination.jsx";
import PageHeader from "../components/PageHeader.jsx";
import HeadTable from "../components/HeadTable.jsx";
import RowTableEmployeeList from "../components/employee/RowTableEmployeeList.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal-slice";
import { deleteEmployee, getEmployees } from "../store/employee-actions.js";
import Loading from "../components/loader/Loading.jsx";
import usePaginationCall from "../customHooks/usePaginationCall.js";

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const employeesDataTable = useSelector(
    (state) => state.employees.employeeDataTable
  );
  const loading = useSelector((state) => state.employees.loading);

  const [itemsPerPage, setItemsPerPage, pageNumber, setPageNumber] =
    usePaginationCall(10, 1);
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
      <PageHeader
        title="Employees"
        buttonLabel="Add Employee"
        buttonOnClick={() =>
          navigate("/admin/employee/employee-add")
        }
      />

      <div className="overflow-x-auto shadow-md sm:rounded-t-lg">
        <table className="w-full text-left rtl:text-right text-gray-900 text-xs es:text-sm sm:text-base ">
          <thead className="text-xs text-primary uppercase bg-gray-50 hidden sm:table-header-group">
            <tr>
              {HEADING?.map((heading) => (
                <HeadTable key={heading.id}>{heading.label}</HeadTable>
              ))}
            </tr>
          </thead>
          <tbody className="block sm:table-row-group text-center sm:text-start ">
            <RowTableEmployeeList deleteEmployee={handleDelete} />
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
      {loading && <Loading fullHeightWidth />}
    </>
  );
}
