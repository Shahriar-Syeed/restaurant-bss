import Button from "../UI/Button.jsx";
import Modal from "../UI/Modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal-slice.js";
import EmployeeForm from "./EmployeeForm.jsx";

export default function EmployeeCreateForm() {
  const dispatch = useDispatch();
  const modalId = useSelector((state) => state.modal.id);
  const errorMessage = useSelector((state) => state.employees.error);
  // Modal
  const isOpen = useSelector((state) => state.modal.open);

  function closeModal() {
    dispatch(modalActions.close());
    dispatch(modalActions.id(null));
  }

  return (
    <div className="">
      {modalId === "employee-create-error" && (
        <Modal open={isOpen} onClose={closeModal}>
          <h1>Failed!</h1>
          {errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <p>Invalid Password or Username</p>
          )}
          <div className="modal-action p-2">
            <Button
              className="float-end button-primary sm:py-2 sm:px-4 py-1.5 px-3 rounded-lg"
              onClick={closeModal}
              type="button"
            >
              Close
            </Button>
          </div>
        </Modal>
      )}
      <EmployeeForm />
    </div>
  );
}
