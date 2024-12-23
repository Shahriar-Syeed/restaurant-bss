
import PageHeader from "../PageHeader.jsx";
import EmployeeCreateForm from './EmployeeCreateForm.jsx';
import { useNavigate } from "react-router-dom";

export default function EmployeeAddPage() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader
        title="Add Employee"
        buttonLabel="Back"
        buttonOnClick={() => navigate("../employee-list")}
      />
      <EmployeeCreateForm/>
    </>
  );
}
