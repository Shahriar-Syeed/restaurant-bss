import DeleteIcon from "../svg/DeleteIcon.jsx";
import Button from "../UI/Button.jsx";
import EditIcon from "../svg/EditIcon.jsx";
import OrderICardFoodItems from "./OrderICardFoodItems.jsx";
import { forwardRef } from "react";

const OrderCard = forwardRef(function OrderCard(
  { eachOrderItem, deleteOrder, editStatus, ...props },
  orderRef
) {
  return (
    <div
      {...props}
      ref={orderRef}
      className="rounded-lg border-2 mx-auto xl:p-10 lg:p-6 md:p-5 sm:p-4 p-3 shadow-lg bg-white sm:w-[min(100%,_25rem)] w-[min(90%,_25rem)] overflow-x-clip relative group"
    >
      <div className="flex justify-between mb-3 gap-0.5">
        <div>
          <h3 className="text-md md:text-xl sm:text-lg font-bold text-stone-900/90">
            {eachOrderItem.orderNumber}
          </h3>
          <p className="font-bold text-stone-900/80">
            Date: {eachOrderItem.orderTime}
          </p>
        </div>
        <Button
          type="button"
          onClick={() => deleteOrder(eachOrderItem.id)}
          className=" self-start"
        >
          <DeleteIcon className="xl:hidden sm:p-1.5 p-1 border border-red-700 hover:bg-red-700 fill-red-700 hover:fill-white rounded-xl sm:w-8 md:w-10 w-7" />
        </Button>
      </div>
      <Button
        type="button"
        onClick={() => deleteOrder(eachOrderItem.id)}
        className="absolute hidden xl:top-0 xl:right-0 translate-x-full xl:group-hover:inline-block xl:group-hover:translate-x-0 xl:group-hover:top-3 xl:group-hover:right-3"
      >
        <DeleteIcon className="sm:p-1.5 p-1 border border-red-700 hover:bg-red-700 fill-red-700 hover:fill-white rounded-lg sm:w-8 md:w-10 w-7" />
      </Button>
      <div
        className=" h-[12.5rem] border-b border-b-black mb-3 pb-1 overflow-y-auto [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-red-300 [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-clip-padding"
      >
        {eachOrderItem?.orderItems?.map((item) => (
          <OrderICardFoodItems
            key={item.id}
            item={item}
            className="flex gap-3 items-center mb-2"
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-1 justify-between items-center text-md">
        <p>
          Total Item: <strong>{eachOrderItem?.orderItems?.length}</strong>
        </p>
        <p className="text-end">
          Table:
          <strong>{eachOrderItem?.table?.tableNumber}</strong>
        </p>
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <p className="whitespace-nowrap">
          Total:{" "}
          <strong className="text-green-800">{eachOrderItem.amount}</strong>
        </p>
        <span
          className={`ms-auto me-2 font-extrabold ${
            eachOrderItem.orderStatus === "Pending"
              ? "text-yellow-500"
              : eachOrderItem.orderStatus === "Confirmed"
              ? "text-blue-600"
              : eachOrderItem.orderStatus === "Preparing"
              ? "text-orange-600"
              : eachOrderItem.orderStatus === "PreparedToServe"
              ? "text-teal-600"
              : eachOrderItem.orderStatus === "Served"
              ? "text-green-600"
              : "text-gray-600"
          }`}
        >
          {eachOrderItem.orderStatus}
        </span>
        <Button
          type="button"
          aria-label="edit"
          onClick={() =>
            editStatus(eachOrderItem.id, eachOrderItem.orderNumber)
          }
        >
          <EditIcon className="p-0.5 rounded shadow-sm stroke-green-700 bg-slate-50 hover:stroke-green-900 w-7 hover:bg-slate-100" />
        </Button>
      </div>
    </div>
  );
});
export default OrderCard;
