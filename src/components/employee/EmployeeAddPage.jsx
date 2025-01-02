
import PageHeader from "../PageHeader.jsx";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "./EmployeeForm.jsx";

export default function EmployeeAddPage() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader
        title="Add Employee"
        buttonLabel="Back"
        buttonOnClick={() => navigate("../employee-list")}
      />
      <EmployeeForm />
    </>
  );
}
