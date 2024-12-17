import Button from "../UI/Button.jsx";
import OrderDetails from "./OrderDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, toggleCartDrawer } from "../../store/cart-actions.js";
import Loading from "../loader/Loading.jsx";
import EmptyCartSvg from "../svg/EmptyCartSvg.jsx";
import CloseIcon from "../svg/CloseIcon.jsx";

export default function CartWithDrawer() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItem);
  const selectedTableNumber = useSelector(
    (state) => state.cart.selectedTableNumber
  );

  const showingCartDrawer = useSelector((state) => state.cart.showCartDrawer);
  const cartLoading = useSelector((state) => state.cart.loading);

  function toggle() {
    dispatch(toggleCartDrawer());
  }
  function sentOrder(orders) {
    const updatedOrders = {
      ...orders,
      items: orders.items.map(({ foodImage, foodName, ...rest }) => rest),
      orderNumber: new Date().toISOString(),
      phoneNumber: "",
    };
    dispatch(createOrder(updatedOrders));
  }
  return (
    <>
      {cartLoading && <Loading />}
      <Button
        className="relative rounded-md hover:bg-red-800 sm:px-3 md:px-4 px-2 py-2"
        type="button"
        onClick={toggle}
      >
        <svg
          className="h-6 fill-white"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path d="m17.21 9-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM9 9l3-4.4L15 9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2"></path>
        </svg>
        <span className="absolute -right-1 sm:right-1 md:right-2 top-0">
          {cartItems?.items.reduce((acc, curr) => (acc = acc + 1), 0)}
        </span>
      </Button>
      <div
        className={`fixed top-0 right-0 z-40 h-screen ps-4 pt-4 pb-4 overflow-y-auto transition-transform bg-white text-gray-950 w-full max-w-80 text-base sm:min-w-[28rem] lg:min-w-[30rem] ${
          showingCartDrawer ? "transform-none" : "translate-x-full"
        }`}
        aria-labelledby="drawer-right-label"
      >
        <h5 className=" items-center mb-5 border-b-2 border-primary text-2xl text-primary font-bold me-4 pb-1">
          Cart
        </h5>
        <Button
          type="button"
          aria-controls="drawer-right-cart"
          className="text-gray-400 bg-primary hover:bg-opacity-35  rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center z-50"
          onClick={toggle}
        >
          <CloseIcon className="w-3 h-3" />
          <span className="sr-only">Close menu</span>
        </Button>
        <div
          className={`grid ${
            cartItems?.items?.length > 0 && "content-start"
          } h-[calc(100%-8.4rem)] overflow-y-auto [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-red-300 [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-clip-padding`}
        >
          {selectedTableNumber && (
            <h2 className="font-bold text-center">
              Order for {selectedTableNumber}
            </h2>
          )}
          {cartItems?.items?.length > 0 ? (
            cartItems.items.map((item) => (
              <OrderDetails key={item.foodId} cartItem={item} />
            ))
          ) : (
            <EmptyCartSvg className="place-self-center opacity-90" />
          )}
        </div>
        <hr />
        <h3 className="text-lg font-bold pe-4 py-1">
          <span>Subtotal:</span>
          <span className="float-end">
            {cartItems.amount ? cartItems.amount : 0}&#2547;
          </span>
        </h3>
        <div className="pe-4">
          <Button
            className="button button-primary rounded-lg w-full py-2 font-bold"
            type="button"
            onClick={() => sentOrder(cartItems)}
          >
            Confirm Order
          </Button>
        </div>
      </div>
      <div
        className={
          showingCartDrawer &&
          `bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30`
        }
        onClick={toggle}
      ></div>
    </>
  );
}
