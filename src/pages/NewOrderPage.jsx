import { useNavigate } from "react-router-dom";
import defaultImage from "../assets/default-image-preview.png";
import PageHeader from "../components/PageHeader";
import Modal from "../components/UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/UI/Button";
import { modalActions } from "../store/modal-slice";
import { useCallback, useEffect, useRef, useState } from "react";
import { getFoods } from "../store/food-actions";
import { getEmployeeTables } from "../store/employee-tables-actions";
import Loading from "../components/loader/Loading";
import { setTableIdInCart } from "../store/cart-actions";

export default function NewOrderPage() {
  const [isSelected, setIsSelected] = useState(null);
  const [tableCount, setTableCount] = useState(10);
  const [menuCount, setMenuCount] = useState(10);

  // const menuItems = useSelector((state)=>state.foods.foodsRowData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tableInfo = useSelector(
    (state) => state.employeeTables.employeeTablesDataTable
  );
  const foodInfo = useSelector((state) => state.foods.foodDataTable);

  const tableLoading = useSelector((state) => state.employeeTables.loading);
  const foodLoading = useSelector((state) => state.foods.loading);

  const cartItems = useSelector((state) => state.cart.cartItem);
  const selectedTableId = useSelector((state) => state.cart.selectedTableId);

  const hasMoreTable = tableInfo.totalRecords - tableCount;
  const hasMoreMenu = foodInfo.totalRecords - menuCount;

  useEffect(() => {
    if (tableCount < tableInfo?.totalRecords) {
      setTableCount(tableInfo.totalRecords);
    }
    dispatch(getEmployeeTables(1, tableCount));
  }, [tableCount, dispatch]);

  useEffect(() => {
    dispatch(getFoods(1, menuCount));
  }, [menuCount, dispatch]);
  console.log(tableInfo);
  function handleSelection(tableId) {
    setIsSelected((prev) => (prev === tableId ? null : tableId));
    dispatch(setTableIdInCart(tableId));

    console.log('cartItems',cartItems,'selectedTableId',selectedTableId)
  }

  // const observer = new IntersectionObserver()
  // table intersection observer
  const tableObserver = useRef();
  const lastTableElementRef = useCallback(
    (node) => {
      if (tableLoading) return;
      if (tableObserver.current) tableObserver.current.disconnect();
      tableObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreTable > 0) {
          if (tableCount + 5 < tableInfo.totalRecords) {
            setTableCount((prevTableCount) => prevTableCount + 5);
          } else {
            setTableCount(tableInfo.totalRecords);
          }
        }
      });
      if (node) tableObserver.current.observe(node);
      console.log("node", node);
    },
    [tableLoading, hasMoreTable]
  );
  // menu intersection observer
  const menuObserver = useRef();
  const lastMenuElementRef = useCallback(
    (node) => {
      if (foodLoading) return;
      if (menuObserver.current) menuObserver.current.disconnect();
      menuObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreMenu > 0) {
          if (menuCount + 5 < foodInfo.totalRecords) {
            setMenuCount((prevMenuCount) => prevMenuCount + 5);
          } else {
            setMenuCount(foodInfo.totalRecords);
          }
        }
      });
      if (node) tableObserver?.current?.observe(node);
      console.log("node", node);
    },
    [foodLoading, hasMoreMenu]
  );

  // Modal

  const isOpen = useSelector((state) => state.modal.open);
  function closeModal() {
    dispatch(modalActions.close());
  }
  return (
    <>
      <Modal open={isOpen} onClose={closeModal}>
        <h1>Failed fetching data!</h1>
        {/* {errorMess ? <p>{errorMess}</p> : <p>Invalid Password or Username</p>} */}
        <div className="modal-action p-2">
          <Button
            className="float-end button-primary px-4 py-2 rounded-lg"
            onClick={closeModal}
          >
            Close
          </Button>
        </div>
      </Modal>
      {(tableLoading || foodLoading) && <Loading />}
      <PageHeader title="Order Food" />
      <div className="grid lg:grid-cols-4 lg:gap-4 md:gap-3.5 sm:gap-3 gap-2.5">
        <section className="lg:col-end-2 pt-3 lg:pb-3 bg-white rounded-lg overflow-hidden">
          <header>
            <h2 className="font-semibold text-lg text-center mb-3">
              SELECT A TABLE{` (${tableCount})`}
            </h2>
          </header>
          <div className="flex lg:flex-col gap-3 viewport-hight overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto lg:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 lg:[&::-webkit-scrollbar]:h-auto [&::-webkit-scrollbar-track]:bg-gray-300  [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded px-2 lg:px-0 pb-3 lg:pb-0">
            {tableInfo?.data?.map((table, tableIndex) =>
              tableInfo.data.length !== tableIndex + 1 ? (
                <div
                  className={`card flex flex-col lg:flex-row gap-2 items-center justify-evenly py-3 px-3 lg:px-0 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white lg:border-dotted lg:border-b-2 lg:border-collapse shadow-md ${
                    isSelected === table.id && "bg-red-600 text-white"
                  }`}
                  key={table.id}
                  onClick={() => handleSelection(table.id)}
                >
                  <img
                    src={
                      table.image === ""
                        ? defaultImage
                        : `https://restaurantapi.bssoln.com/images/table/${table.image}`
                    }
                    alt="table"
                    className="w-24 lg:rounded-lg"
                  />
                  <span className="md:font-semibold font-medium lg:font-bold lg:text-xl md:text-lg sm:text-base text-base">
                    {table.tableNumber}
                  </span>
                </div>
              ) : (
                <div
                  className={`card flex flex-col lg:flex-row gap-2 items-center justify-evenly py-3 px-3 lg:px-0 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white lg:border-dotted lg:border-b-2 lg:border-collapse shadow-md ${
                    isSelected === table.id && "bg-red-600 text-white"
                  }`}
                  key={table.id}
                  onClick={() => handleSelection(table.id)}
                  ref={lastTableElementRef}
                >
                  <img
                    src={
                      table.image === ""
                        ? defaultImage
                        : `https://restaurantapi.bssoln.com/images/table/${table.image}`
                    }
                    alt="table"
                    className="w-24 lg:rounded-lg"
                  />
                  <span className="md:font-semibold font-medium lg:font-bold lg:text-xl md:text-lg sm:text-base text-base">
                    {table.tableNumber}
                  </span>
                </div>
              )
            )}
          </div>
        </section>
        <section className="lg:col-start-2 lg:col-end-5 p-3 bg-white rounded-lg relative">
          {!isSelected && (
            <div className="absolute bg-white bg-opacity-80 inset-0 rounded-lg">
              <div className="font-bold p-4 border-4 border-dashed border-red-700 text-red-950 rounded-t-lg h-40 text-center text-2xl flex items-center justify-center flex-col bg-white gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#cc080b"
                  version="1.1"
                  width="32px"
                  height="32px"
                  viewBox="0 0 45.311 45.311"
                >
                  <g>
                    <path d="M22.675,0.02c-0.006,0-0.014,0.001-0.02,0.001c-0.007,0-0.013-0.001-0.02-0.001C10.135,0.02,0,10.154,0,22.656   c0,12.5,10.135,22.635,22.635,22.635c0.007,0,0.013,0,0.02,0c0.006,0,0.014,0,0.02,0c12.5,0,22.635-10.135,22.635-22.635   C45.311,10.154,35.176,0.02,22.675,0.02z M22.675,38.811c-0.006,0-0.014-0.001-0.02-0.001c-0.007,0-0.013,0.001-0.02,0.001   c-2.046,0-3.705-1.658-3.705-3.705c0-2.045,1.659-3.703,3.705-3.703c0.007,0,0.013,0,0.02,0c0.006,0,0.014,0,0.02,0   c2.045,0,3.706,1.658,3.706,3.703C26.381,37.152,24.723,38.811,22.675,38.811z M27.988,10.578   c-0.242,3.697-1.932,14.692-1.932,14.692c0,1.854-1.519,3.356-3.373,3.356c-0.01,0-0.02,0-0.029,0c-0.009,0-0.02,0-0.029,0   c-1.853,0-3.372-1.504-3.372-3.356c0,0-1.689-10.995-1.931-14.692C17.202,8.727,18.62,5.29,22.626,5.29   c0.01,0,0.02,0.001,0.029,0.001c0.009,0,0.019-0.001,0.029-0.001C26.689,5.29,28.109,8.727,27.988,10.578z" />
                  </g>
                </svg>
                <p>Please, At First Select A Table!</p>
              </div>
            </div>
          )}
          <h1>Add foods to the selected table.</h1>
          <div className="flex flex-col gap-2 viewport-hight pb-3 lg:pb-0 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-300  [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded">
            {foodInfo?.data?.map((menuItem, menuItemIndex) =>
              foodInfo.data.length !== menuItemIndex + 1 ? (
                <div
                  key={menuItem.id}
                  className="food-card p-3 shadow-md grid lg:grid-cols-4 lg:gap-4 md:gap-3.5 sm:gap-3 gap-2.5 border hover:border-red-900 rounded-sm"
                >
                  <div className="lg:row-span-4 place-self-center max-w-52">
                    <img
                      src={
                        menuItem.image
                          ? `https://restaurantapi.bssoln.com/images/food/${menuItem.image}`
                          : defaultImage
                      }
                      alt={menuItem.name}
                      className="w-full object-cover rounded-lg"
                    />
                  </div>
                  <h2 className="text-2xl lg:col-start-2 lg:col-end-5 font-bold capitalize">
                    {menuItem.name}
                  </h2>
                  <p className="lg:col-start-2 lg:col-end-5 max-h-16 line-clamp-3 text-ellipsis ">
                    Description: {menuItem.description}
                  </p>
                  <div className="flex flex-wrap justify-between items-center gap-y-3 lg:col-start-2 lg:col-end-5">
                    <h3 className="text-lg font-semibold text-nowrap min-w-44">
                      price: &nbsp;
                      <span
                        className={
                          menuItem.discountPrice === 0
                            ? `text-green-950`
                            : `line-through text-gray-500`
                        }
                      >
                        {menuItem.price} &#2547;
                      </span>{" "}
                      &nbsp;
                      {menuItem.discountPrice !== 0 && (
                        <span className="text-green-950">
                          {menuItem.discountPrice} &#2547;
                        </span>
                      )}
                    </h3>
                    <Button className="button button-primary py-2 px-4 text-white rounded self-">
                      ADD TO CART
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  key={menuItem.id}
                  className="food-card p-3 shadow-md grid lg:grid-cols-4 lg:gap-4 md:gap-3.5 sm:gap-3 gap-2.5 border hover:border-red-900 rounded-sm"
                  ref={lastMenuElementRef}
                >
                  <div className="lg:row-span-4 place-self-center max-w-52">
                    <img
                      src={
                        menuItem.image
                          ? `https://restaurantapi.bssoln.com/images/food/${menuItem.image}`
                          : defaultImage
                      }
                      alt={menuItem.name}
                      className="w-full object-cover rounded-lg"
                    />
                  </div>
                  <h2 className="text-2xl lg:col-start-2 lg:col-end-5 font-bold capitalize">
                    {menuItem.name}
                  </h2>
                  <p className="lg:col-start-2 lg:col-end-5 max-h-16 line-clamp-3 text-ellipsis ">
                    Description: {menuItem.description}
                  </p>
                  <div className="flex flex-wrap justify-between items-center gap-y-3 lg:col-start-2 lg:col-end-5">
                    <h3 className="text-lg font-semibold text-nowrap min-w-44">
                      price: &nbsp;
                      <span
                        className={
                          menuItem.discountPrice === 0
                            ? `text-green-950`
                            : `line-through text-gray-500`
                        }
                      >
                        {menuItem.price} &#2547;
                      </span>{" "}
                      &nbsp;
                      {menuItem.discountPrice !== 0 && (
                        <span className="text-green-950">
                          {menuItem.discountPrice} &#2547;
                        </span>
                      )}
                    </h3>
                    <Button className="button button-primary py-2 px-4 text-white rounded">
                      ADD TO CART
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </>
  );
}
