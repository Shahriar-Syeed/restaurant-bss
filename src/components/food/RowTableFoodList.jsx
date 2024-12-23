import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal";
import { modalActions } from "../../store/modal-slice";
import apiUrl from "../../apiUrl/ApiUrl";
import defaultImage from "../../assets/default-image-preview.png";

export default function RowTableFoodList({ food, deleteFood }) {
  const dispatch = useDispatch();
  // Modal
  const modalId = useSelector((state) => state.modal.id);

  const isOpen = useSelector((state) => state.modal.open);
  function closeModal() {
    dispatch(modalActions.close());
    dispatch(modalActions.id(null));
  }
  function deleteThisFood() {
    deleteFood(modalId?.id);
    closeModal();
  }
  function openDeleteConfirmationModal(id, foodDeleteText) {
    dispatch(modalActions.id({ id: id, text: foodDeleteText }));
    dispatch(modalActions.open());
  }

  return (
    <>
      {modalId?.id === food.id && modalId?.text === "deleteThisFood" && (
        <Modal open={isOpen} onClose={closeModal}>
          <h1>Do you want to delete this ?</h1>
          <div className="flex flex-wrap justify-end gap-2 p-2">
            <Button
              className="button__outline-primary sm:py-2 sm:px-4 py-1.5 px-3 rounded-lg"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              className="button-primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg"
              type="button"
              onClick={deleteThisFood}
            >
              Confirm
            </Button>
          </div>
        </Modal>
      )}
      <tr className="block sm:table-row odd:bg-white even:bg-gray-50 sm:border-b border-b-0 border-gray-700 p-1 shadow-md rounded-lg mb-2 sm:p-0 sm:rounded-none sm:shadow-none">
        <th
          scope="row"
          className="flex sm:table-cell justify-center md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1"
        >
          <div className="overflow-hidden sm:w-10 sm:h-10 w-16 h-16 rounded-lg">
            <img
              src={
                food.image
                  ? `${apiUrl.getFoodImage}${food.image}`
                  : defaultImage
              }
              alt={food.name}
              className="w-full h-full object-cover"
              title={food.name}
            />
          </div>
        </th>
        <td
          className="block sm:table-cell md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 break-words md:break-normal"
          data-th="NAME: "
        >
          {food.name}
        </td>
        <td
          className="block sm:table-cell md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 break-words md:break-normal"
          data-th="PRICE: "
        >
          {food.price}
        </td>
        <td
          className="block sm:table-cell md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 break-words md:break-normal"
          data-th="DISCOUNT TYPE: "
        >
          {food.discountType}
        </td>
        <td
          className="block sm:table-cell md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 break-words md:break-normal"
          data-th="DISCOUNT: "
        >
          {food.discount}
        </td>
        <td
          className="block sm:table-cell md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 break-words md:break-normal"
          data-th="DISCOUNT PRICE: "
        >
          {food.discountPrice}
        </td>
        <td className="md:px-2 xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 flex justify-evenly sm:justify-start gap-1">
          <Link
            to={`/admin/foods/${food.id}/food-edit`}
            className="rounded-50 h-8 w-8 grid place-items-center hover:bg-stone-100 fill-green-700 hover:fill-green-600"
          >
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="20px"
            >
              <path d="M3 10h11v2H3zm0-2h11V6H3zm0 8h7v-2H3zm15.01-3.13.71-.71c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-.71.71zm-.71.71-5.3 5.3V21h2.12l5.3-5.3z"></path>
            </svg>
          </Link>
          <Button
            textOnly
            className="rounded-50 h-8 w-8 grid place-items-center hover:bg-stone-100 fill-red-700 hover:fill-red-600"
            type="button"
            onClick={() => {
              openDeleteConfirmationModal(food.id, "deleteThisFood");
            }}
          >
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="fill-inherit"
              width="20px"
            >
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
            </svg>
          </Button>
        </td>
      </tr>
    </>
  );
}
