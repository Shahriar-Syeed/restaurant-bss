import PageHeader from "../components/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFoods } from "../store/food-actions";
import { getEmployeeTables } from "../store/employee-tables-actions";
import Loading from "../components/loader/Loading";
import {
  addFood,
  setTableIdInCart,
  toggleCartDrawer,
} from "../store/cart-actions";
import ExclamationIcon from "../components/svg/ExclamationIcon";
import NewOrderMenuList from "../components/new-order/NewOrderMenuList";
import NewOrderTableList from "../components/new-order/NewOrderTableList";
import usePageItems from "../customHooks/usePagesItems";

export default function NewOrderPage() {
  const dispatch = useDispatch();

  const tableInfo = useSelector(
    (state) => state.employeeTables.employeeTablesDataTable
  );
  const foodInfo = useSelector((state) => state.foods.foodDataTable);

  const tableLoading = useSelector((state) => state.employeeTables.loading);
  const foodLoading = useSelector((state) => state.foods.loading);
  const selectedTableId = useSelector((state) => state.cart.selectedTableId);

  const { itemsPerPage: tableCount, lastElementRef: lastTableElementRef } =
    usePageItems(6, 3, tableInfo, tableLoading);
  const { itemsPerPage: menuCount, lastElementRef: lastMenuElementRef } =
    usePageItems(6, 3, foodInfo, foodLoading);

  useEffect(() => {
    if (tableCount > 0) {
      dispatch(getEmployeeTables(1, tableCount));
    }
  }, [tableCount, dispatch]);

  useEffect(() => {
    if (menuCount > 0) {
      dispatch(getFoods(1, menuCount));
    }
  }, [menuCount, dispatch]);

  function handleSelection(tableId, tableNumber) {
    dispatch(setTableIdInCart(tableId, tableNumber));
  }
  function addFoodItemInCart(food) {
    const foodUnitPrice =
      food.discountPrice === 0 ? food.price : food.discountPrice;
    dispatch(addFood(food.id, foodUnitPrice, food.name, food.image));
  }
  function toggleCart() {
    dispatch(toggleCartDrawer());
  }

  return (
    <>
      {(tableLoading || foodLoading) && <Loading fullHeightWidth />}
      <PageHeader title="Order Food" />
      <div className="grid lg:grid-cols-4 lg:gap-4 md:gap-3.5 sm:gap-3 gap-2.5">
        <section className="lg:col-end-2 bg-white rounded-lg overflow-hidden">
          <header className="pt-3 lg:pb-2 mb-1 bg-stone-800">
            <h2 className="font-semibold text-center text-white">
              SELECT A TABLE{` (${tableCount})`}
            </h2>
          </header>
          <div className="flex lg:flex-col gap-3 viewport-hight overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto lg:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 lg:[&::-webkit-scrollbar]:h-auto [&::-webkit-scrollbar-track]:bg-gray-300  [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded px-2 lg:px-0 pb-3 lg:pb-0">
            {tableInfo?.data?.map((table, tableIndex) => (
              <NewOrderTableList
                className={`card flex flex-col lg:flex-row gap-2 items-center justify-evenly py-3 px-3 lg:px-0 rounded-lg cursor-pointer hover:bg-red-600/90 hover:text-white lg:border-dotted lg:border-b-2 lg:border-collapse shadow-md ${
                  selectedTableId === table.id && "bg-red-600/95 text-white"
                }`}
                table={table}
                key={table.id}
                onClick={() => handleSelection(table.id, table.tableNumber)}
                ref={
                  tableInfo.data.length === tableIndex + 1
                    ? lastTableElementRef
                    : null
                }
              />
            ))}
          </div>
        </section>
        <section className="lg:col-start-2 lg:col-end-5 bg-white rounded-lg relative">
          {!selectedTableId && (
            <div className="absolute bg-white bg-opacity-80 inset-0 rounded-lg">
              <div className="font-bold p-4 border-4 border-dashed border-red-700 text-red-950 rounded-t-lg h-40 text-center text-2xl flex items-center justify-center flex-col bg-white gap-3">
                <ExclamationIcon className="h-8 w-8 fill-primary" />
                <p>Please, At First Select A Table!</p>
              </div>
            </div>
          )}
          <h1 className="text-md font-semibold text-center pt-3 lg:pb-2 bg-stone-800 text-white rounded-t-lg mb-1">
            Add foods to the selected table.
          </h1>
          <div className="flex flex-col gap-2 viewport-hight pb-3 lg:pb-0 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-300  [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded">
            {foodInfo?.data?.map((menuItem, menuItemIndex) =>
              foodInfo.data.length !== menuItemIndex + 1 ? (
                <NewOrderMenuList
                  className="food-card p-3 shadow-md grid lg:grid-cols-4 lg:gap-4 md:gap-3.5 sm:gap-3 gap-2.5 border hover:border-red-900 rounded-sm"
                  key={menuItem.id}
                  menuItem={menuItem}
                  toggleCart={toggleCart}
                  addFoodItemInCart={addFoodItemInCart}
                />
              ) : (
                <NewOrderMenuList
                  className="food-card p-3 shadow-md grid lg:grid-cols-4 lg:gap-4 md:gap-3.5 sm:gap-3 gap-2.5 border hover:border-red-900 rounded-sm"
                  key={menuItem.id}
                  menuItem={menuItem}
                  toggleCart={toggleCart}
                  addFoodItemInCart={addFoodItemInCart}
                  ref={lastMenuElementRef}
                />
              )
            )}
          </div>
        </section>
      </div>
    </>
  );
}
