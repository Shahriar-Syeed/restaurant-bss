import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination.jsx";
import PageHeader from "../components/PageHeader.jsx";
import HeadTable from "../components/HeadTable.jsx";
import RowTableEmployeeList from "../components/employee/RowTableEmployeeList.jsx";
import { useEffect, useState } from "react";

import Modal from "../components/UI/Modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal-slice";
import Button from "../components/UI/Button.jsx";
import Loading from "../components/loader/Loading.jsx";
import RowTableFoodList from "../components/food/RowTableFoodList.jsx";
import { deleteFood, getFoods } from "../store/food-actions.js";

const HEADING = [
  { id: "foodImage", label: "Image" },
  { id: "foodName", label: "Name" },
  { id: "price", label: "Price" },
  { id: "discountType", label: "Discount Type" },
  { id: "discount", label: "Discount" },
  { id: "discountPrice", label: "Discount Price" },
  { id: "foodAction", label: "Action" },
];

export default function FoodsListPage() {

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const foodDataTable = useSelector(
    (state) => state.foods.foodDataTable
  );
  const loading = useSelector((state) => state.foods.loading);

  useEffect(() => {
    dispatch(getFoods(pageNumber, itemsPerPage));
  }, [pageNumber, itemsPerPage, dispatch]);
  function handleDelete(foodId) {
    dispatch(deleteFood(foodId));
  }
  // Modal

  const isOpen = useSelector((state) => state.modal.open);
  function closeModal() {
    dispatch(modalActions.close());
  }
  const errorMess = useSelector((state) => state.foods.error);

  return (
    <>
      <Modal open={isOpen} onClose={closeModal}>
        <h1>Failed fetching data!</h1>
        {errorMess ? <p>{errorMess}</p> : <p>Invalid Password or Username</p>}
        <div className="modal-action p-2">
          <Button
            className="float-end button-primary px-4 py-2 rounded-lg"
            onClick={closeModal}
          >
            Close
          </Button>
        </div>
      </Modal>
      <PageHeader
        title="All Food"
        buttonLabel="ADD FOOD"
        buttonOnClick={() =>
          navigate("/admin/foods/add-food")
        }
      />

      <div className="overflow-x-auto shadow-md sm:rounded-t-lg">
        <table className="w-full text-left rtl:text-right text-gray-900 text-xs sm:text-sm ">
          <thead className="text-xs text-primary uppercase bg-gray-50">
            <tr>
              {HEADING?.map((heading) => (
                <HeadTable key={heading.id}>{heading.label}</HeadTable>
              ))}
            </tr>
          </thead>
          <tbody>
           {foodDataTable?.data?.map(food=><RowTableFoodList
              food={food}
              deleteFood={handleDelete}
              key={food.id}
            />)}
          </tbody>
        </table>
      </div>
      <Pagination
        className="bg-white rounded-b-lg"
        totalPages={foodDataTable.totalPages}
        totalRecord={foodDataTable.totalRecords}
        onChangePageNumber={setPageNumber}
        onChangeItemsPerPage={setItemsPerPage}
      />
      {loading && <Loading />}
    </>
  );
}



