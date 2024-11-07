import { useState } from "react";
import Button from "../UI/Button.jsx";
import defaultImage from "../../assets/default-image-preview.png";
import OrderDetails from "./OrderDetails.jsx";

const DUMMY_DATA = [
  {
    id: 1,
    name: "Margherita Pizza",
    image:
      "https://plus.unsplash.com/premium_photo-1670869816874-5a22db823d6f?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quantity: 2,
    price: "$12.99",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    image: "",
    quantity: 1,
    price: "$14.99",
  },
  {
    id: 3,
    name: "Veggie Burger",
    image:
      "https://images.unsplash.com/photo-1589591830600-7ba977995a5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3R1cmFudCUyMHNpbmdsZSUyMHRhYmxlfGVufDB8fDB8fHww",
    quantity: 3,
    price: "$10.99",
  },
  {
    id: 4,
    name: "French Fries",
    image:
      "https://www.istockphoto.com/photo/appetizing-french-fries-in-a-bowl-gm966934632-263790734?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2FFrench-Fries&utm_medium=affiliate&utm_source=unsplash&utm_term=French+Fries%3A%3Aaffiliate-collections%3Ab",
    quantity: 4,
    price: "$5.99",
  },
  {
    id: 5,
    name: "Caesar Salad",
    image:
      "https://media.istockphoto.com/id/1308224335/photo/caesar-salad-with-parmesan-cheese-grilled-chicken-meat-and-croutons.webp?a=1&b=1&s=612x612&w=0&k=20&c=8Msb4JWperxyyimqabVX03MxJ8GSeKRSKA2tES6riIw=",
    quantity: 1,
    price: "$7.99",
  },
  {
    id: 6,
    name: "Spaghetti Bolognese",
    image:
      "https://media.istockphoto.com/id/1429067111/photo/spaghetti-bolognese-top-view-close-up-no-people-homemade.webp?a=1&b=1&s=612x612&w=0&k=20&c=zR6IA35we-I7wuMkhw7nyKnBrhNx4kAnlcs4_0I64E4=",
    quantity: 2,
    price: "$13.99",
  },
  {
    id: 7,
    name: "Chicken Nuggets",
    image: "",
    quantity: 5,
    price: "$6.99",
  },
  {
    id: 8,
    name: "Fish Tacos",
    image:
      "https://images.unsplash.com/photo-1529456649654-4a285c7aa832?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHJlc3R1cmFudCUyMHNpbmdsZSUyMHRhYmxlfGVufDB8fDB8fHww",
    quantity: 2,
    price: "$11.99",
  },
  {
    id: 9,
    name: "Beef Burrito",
    image: "",
    quantity: 1,
    price: "$9.99",
  },
  {
    id: 10,
    name: "Chicken Quesadilla",
    image:
      "https://media.istockphoto.com/id/1398597918/photo/quesadilla-with-chicken-cheese-chilli-greens.webp?a=1&b=1&s=612x612&w=0&k=20&c=8egTwWie0KOmjy5GCOQj14HVkY01-yqp4Sgp9xg4QIY=",
    quantity: 3,
    price: "$8.99",
  },
];

export default function CartWithDrawer() {
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  function toggle() {
    setShowCartDrawer((prev) => !prev);
  }
  return (
    <>
      <Button
        className="relative rounded-md hover:bg-red-800 px-4 py-2"
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
        <span className="absolute right-3 top-0">0</span>
      </Button>
      <div
        className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white text-gray-950 max-w-80 text-base sm:min-w-[28rem] lg:min-w-[30rem] [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 ${
            showCartDrawer ? "transform-none" : "translate-x-full"
          }`}
        aria-labelledby="drawer-right-label"
      >
        <h5 className=" items-center mb-5 border-b-2 border-primary text-xl text-primary font-bold">
          Cart
        </h5>
        <Button
          type="button"
          aria-controls="drawer-right-cart"
          className="text-gray-400 bg-primary hover:bg-opacity-35  rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center z-50"
          onClick={toggle}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </Button>
        <div className="grid">
          {DUMMY_DATA?.map((item) => (
            <OrderDetails key={item.id} cartItem={item} />
          ))}
        </div>
        <h3>
          <span>Subtotal:</span>
          <span className="float-end">3000</span>
        </h3>
        <Button className="button button-primary rounded-lg w-full py-2 font-bold">
          Confirm Order
        </Button>
      </div>
      <div
        className={
          showCartDrawer &&
          `bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30`
        }
        onClick={toggle}
      ></div>
    </>
  );
}
