import { Outlet } from "react-router-dom";
import ErrorModal from "../components/UI/ErrorModal";


export default function RootLayout() {
  return (
    <main>
      <ErrorModal/>
      <Outlet/>
    </main>
  )
}
