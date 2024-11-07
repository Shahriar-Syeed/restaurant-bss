import { useParams } from "react-router-dom"


export default function EmployeeEditPage() {
  const param =useParams();
  return (
    <>
    <section>
      <h1>
        EmployeeEditPage
        
        </h1>
        <h2>
          {param.employeeId}
        </h2>

    </section>
    </>
  );
}
