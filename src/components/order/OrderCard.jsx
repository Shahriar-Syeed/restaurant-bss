import DeleteIcon from "../svg/DeleteIcon.jsx";
import Button from "../UI/Button.jsx";
import defaultImage from "../../assets/default-image-preview.png" ;
import EditIcon from "../svg/EditIcon.jsx";
import OrderICardFoodItems from "./OrderICardFoodItems.jsx";

export default function OrderCard({
  eachOrderItem,
  deleteOrder,
  editStatus,
  ...props
}) {
  return (
    <div
      {...props}
      className="rounded-lg border-2 mx-auto xl:p-10 lg:p-6 md:p-5 sm:p-4 p-3 shadow-lg bg-white sm:w-[min(100%,_25rem)] w-[min(90%,_25rem)]"
    >
      <div className="flex justify-between mb-3 gap-0.5">
        <div>
          <h3 className="text-md md:text-xl sm:text-lg font-bold text-stone-900/90">
            {eachOrderItem.orderNumber}
          </h3>
          <p>{eachOrderItem.id}</p>
          <p className="font-bold text-stone-900/80">
            {eachOrderItem.orderTime}
          </p>
        </div>
        <Button
          type="button"
          onClick={() => deleteOrder(eachOrderItem.id)}
          className="self-start"
        >
          <DeleteIcon className="sm:p-1.5 p-1 border border-red-700 hover:bg-red-700 fill-red-700 hover:fill-white rounded-lg sm:w-8 md:w-10 w-7" />
        </Button>
      </div>
      <div
        className=" h-[12.5rem] border-b border-b-black mb-3 pb-1 overflow-y-auto [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-red-300 [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-clip-padding"
      >
        {eachOrderItem?.orderItems?.map((item) => (
          // <div key={item.id} className="flex gap-3 items-center mb-2">
          //   <div className="sm:w-12 w-10">
          //     <img
          //       src={
          //         item.food.image === ""
          //           ? defaultImage
          //           : `https://restaurantapi.bssoln.com/images/food/${item.food.image}`
          //       }
          //       alt="food image"
          //       className="w-full object-cover rounded-lg"
          //     />
          //   </div>
          //   <div className="flex-grow">
          //     <h4 className="text-md sm:text-lg font-bold mb-1">
          //       {item.food.name}
          //     </h4>
          //     <p className="flex gap-1 flex-wrap pe-2 justify-between">
          //       <span className="text-green-900 font-bold">
          //         {item.totalPrice}৳
          //       </span>
          //       <span>
          //         Qty: <strong>{item.quantity}</strong>
          //       </span>
          //     </p>
          //   </div>
          // </div>
          <OrderICardFoodItems key={item.id} item={item} className="flex gap-3 items-center mb-2" />
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
}
