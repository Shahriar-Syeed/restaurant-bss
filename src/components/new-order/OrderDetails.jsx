import { useDispatch } from "react-redux";
import defaultImage from "../../assets/default-image-preview.png";
import Button from "../UI/Button";
import {
  addFood,
  removeFoodItem,
  subtractFoodQuantity,
} from "../../store/cart-actions";

export default function OrderDetails({ cartItem }) {
  const dispatch = useDispatch();
  function increaseFoodQuantity(foodId) {
    dispatch(addFood(foodId));
    console.log(cartItem);
  }
  function decreaseFoodQuantity(foodId) {
    dispatch(subtractFoodQuantity(foodId));
    console.log("first");
  }
  function deleteFoodFormCart(foodId) {
    dispatch(removeFoodItem(foodId));
  }

  return (
    <div className="flex items-center gap-1 lg:gap-3 sm-gap-2 py-2.5 mb-1 border-b pe-4">
      <div className="h-16 w-16 overflow-clip rounded-lg">
        <img
          src={
            cartItem.foodImage !== ""
              ? `https://restaurantapi.bssoln.com/images/food/${cartItem.foodImage}`
              : defaultImage
          }
          alt=""
          className="h-full w-fit object-cover "
        />
      </div>
      <div>
        <h2 className="font-bold">{cartItem.foodName}</h2>
        <div>
          <Button
            className="p-2 border rounded-l-lg text-xl font-bold hover:bg-slate-100"
            type="button"
            onClick={() => decreaseFoodQuantity(cartItem.foodId)}
          >
            -
          </Button>
          <span className="border border-s-0 border-e-0 p-2 inline-block text-xl font-bold">
            {cartItem.quantity}
          </span>
          <Button
            className="p-2 border rounded-r-lg text-xl font-bold hover:bg-slate-100"
            type="button"
            onClick={() => increaseFoodQuantity(cartItem.foodId)}
          >
            +
          </Button>
        </div>
      </div>
      <div className="ms-auto text-end">
        <Button
          className="mb-2 p-1 rounded-50 hover:"
          type="button"
          onClick={() => deleteFoodFormCart(cartItem.foodId)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#222222"
            height="20px"
            width="20px"
            viewBox="0 0 297 297"
          >
            <g>
              <g>
                <g>
                  <path d="M150.333,203.762c0-32.35,26.317-58.667,58.667-58.667c6.527,0,12.8,1.087,18.669,3.063l4.882-58.587H47.163     l14.518,174.21C63.233,282.408,79.091,297,97.784,297h84.147c18.692,0,34.551-14.592,36.103-33.219l0.173-2.081     c-3.001,0.475-6.075,0.729-9.207,0.729C176.651,262.429,150.333,236.112,150.333,203.762z" />
                  <path d="M209,158.714c-24.839,0-45.048,20.209-45.048,45.048c0,24.839,20.209,45.048,45.048,45.048s45.048-20.209,45.048-45.048     C254.048,178.923,233.839,158.714,209,158.714z M231.101,216.232c2.659,2.66,2.659,6.971,0,9.631     c-1.33,1.329-3.073,1.994-4.816,1.994c-1.742,0-3.486-0.665-4.816-1.994L209,213.393l-12.47,12.47     c-1.33,1.329-3.073,1.994-4.816,1.994c-1.742,0-3.486-0.665-4.816-1.994c-2.659-2.66-2.659-6.971,0-9.631l12.47-12.47     l-12.47-12.47c-2.659-2.66-2.659-6.971,0-9.631c2.66-2.658,6.971-2.658,9.631,0l12.47,12.47l12.47-12.47     c2.661-2.658,6.972-2.658,9.632,0c2.659,2.66,2.659,6.971,0,9.631l-12.47,12.47L231.101,216.232z" />
                  <path d="M112.095,26.102c0-6.883,5.6-12.483,12.483-12.483h30.556c6.884,0,12.484,5.6,12.484,12.483v8.507h13.619v-8.507     C181.238,11.71,169.528,0,155.135,0h-30.556c-14.392,0-26.102,11.71-26.102,26.102v8.507h13.618V26.102z" />
                  <path d="M236.762,63.643c0-8.5-6.915-15.415-15.415-15.415H58.367c-8.5,0-15.415,6.915-15.415,15.415v12.31h193.81V63.643z" />
                </g>
              </g>
            </g>
          </svg>
        </Button>
        <p className="text-green-900 font-bold ">
          Price: {cartItem.totalPrice}&#2547;
        </p>
      </div>
    </div>
  );
}
