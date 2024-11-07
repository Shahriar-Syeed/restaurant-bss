import { useParams } from "react-router-dom";


export default function EmployeeDetailPage() {
  const params = useParams();
  return (
    <>
      <div>EmployeeDetailPage</div>
      <p>Employee ID: {params.employeeId}</p>
    </>
  );
}
