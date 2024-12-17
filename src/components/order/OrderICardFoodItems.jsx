import apiUrl from "../../apiUrl/ApiUrl";
import defaultImage from "../../assets/default-image-preview.png";
export default function OrderICardFoodItems({ item, ...props }) {
  return (
    <div {...props}>
      <div className="sm:w-12 w-10">
        <img
          src={
            item.food.image === ""
              ? defaultImage
              : `${apiUrl.getFoodImage}${item.food.image}`
          }
          alt="food image"
          className="w-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-grow">
        <h4 className="text-md sm:text-lg font-bold mb-1">{item.food.name}</h4>
        <p className="flex gap-1 flex-wrap pe-2 justify-between">
          <span className="text-green-900 font-bold">{item.totalPrice}৳</span>
          <span>
            Qty: <strong>{item.quantity}</strong>
          </span>
        </p>
      </div>
    </div>
  );
}
