import { useSelector, useDispatch } from "react-redux";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { modalActions } from "../../store/modal-slice";

const ErrorModal = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modal.open);
  const errorModalId = useSelector((state) => state.modal.id);
  const registerErrorMessage = useSelector((state) => state.register.error);
  const loginErrorMessage = useSelector((state) => state.login.error);
  const employeeErrorMessage = useSelector((state) => state.employees.error);
  const foodErrorMessage = useSelector((state) => state.foods.error);
  const tableErrorMessage = useSelector((state) => state.employeeTables.error);
  const statisticsErrorMessage = useSelector(
    (state) => state.adminStatistics.error
  );
  const cartSuccess = useSelector((state) => state.cart.success);
  const orderErrorMessage = useSelector((state) => state.order.error);
  const cartErrorMessage = useSelector((state) => state.cart.error);

  const closeModal = () => {
    dispatch(modalActions.close());
    dispatch(modalActions.id(null));
  };

  const title = foodErrorMessage
    ? "Food Error!"
    : loginErrorMessage
    ? "Failed To Login!"
    : registerErrorMessage
    ? "Failed To Register!"
    : tableErrorMessage
    ? "Table Error!"
    : cartErrorMessage
    ? "Cart Error!"
    : employeeErrorMessage
    ? "Employee Error!"
    : orderErrorMessage
    ? "Order Error!"
    : statisticsErrorMessage
    ? "Statistics Error!"
    : cartSuccess
    ? "Order Success!"
    : "Error!";
  const message =
    foodErrorMessage ??
    employeeErrorMessage ??
    tableErrorMessage ??
    orderErrorMessage ??
    cartErrorMessage ??
    statisticsErrorMessage ??
    loginErrorMessage ??
    registerErrorMessage ??
    cartSuccess ??
    null;
  console.log(errorModalId);

  const returnModal = message ? (
    <Modal open={isOpen} onClose={closeModal}>
      <div className="p-4">
        {cartSuccess && (
          <h1 className="text-xl font-bold mb-2 text-green-900">
            Order Successful!
          </h1>
        )}
        {!cartSuccess && (
          <>
            <h1 className="text-xl font-bold mb-2 text-red-900">{title}</h1>
            {errorModalId !== "Failed To Login" && (
              <p className="text-md text-gray-700 mb-1">
                Something went wrong! {errorModalId}
              </p>
            )}
            {errorModalId === "Failed To Login" && (
              <p>Invalid Password or Username.</p>
            )}
            <p className="text-xs text-gray-700 mb-3">{message}</p>
          </>
        )}

        <div className="">
          <Button
            className="button-primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg float-end"
            type="button"
            onClick={closeModal}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  ) : null;

  return returnModal;
};

export default ErrorModal;
