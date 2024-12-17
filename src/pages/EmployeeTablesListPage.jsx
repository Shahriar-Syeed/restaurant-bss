import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import HeadTable from "../components/HeadTable";
import RowTableList from "../components/employee-table/RowTableList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteEmployeeTable,
  getEmployeeTables,
} from "../store/employee-tables-actions";
import Loading from "../components/loader/Loading";

const HEADING = [
  { id: "tableNumber", label: "Table Number" },
  { id: "tableSeats", label: "Table Seats" },
  { id: "employees", label: "Employees" },
  { id: "bookingStatus", label: "Booking Status" },
  { id: "action", label: "Action" },
];

export default function EmployeeTablesListPage() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.employeeTables.loading);
  const employeeTablesDataTable = useSelector(
    (state) => state.employeeTables.employeeTablesDataTable
  );

  useEffect(() => {
    dispatch(getEmployeeTables(pageNumber, itemsPerPage));
  }, [pageNumber, itemsPerPage, dispatch]);
  function handleDelete(id) {
    dispatch(deleteEmployeeTable(id));
  }

  return (
    <>
      {isLoading && <Loading fullHeightWidth />}
      <PageHeader
        title="All Table List"
        buttonLabel="ADD TABLE"
        buttonOnClick={() => navigate("add-table")}
      />
      <div className="shadow-md sm:rounded-t-lg">
        <table className="w-full text-left rtl:text-right text-gray-900 text-xs sm:text-sm lg:text-base">
          <thead className="text-xs text-primary uppercase bg-gray-50 hidden sm:table-header-group">
            <tr>
              {HEADING?.map((heading) => (
                <HeadTable key={heading.id}>{heading.label}</HeadTable>
              ))}
            </tr>
          </thead>
          <tbody className="block sm:table-row-group text-center sm:text-start">
            {employeeTablesDataTable?.data?.map((row) => (
              <RowTableList
                key={row.id}
                tableInfoData={row}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        className="bg-white rounded-b-lg"
        totalPages={employeeTablesDataTable.totalPages}
        totalRecord={employeeTablesDataTable.totalRecords}
        onChangePageNumber={setPageNumber}
        onChangeItemsPerPage={setItemsPerPage}
      />
    </>
  );
}
