import { useEffect, useState } from "react";

export default function UserInfoPage() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchInfo = () => {
      const userInfo = localStorage.getItem("user");

      setUser(JSON.parse(userInfo));
      console.log(user);
    };
    fetchInfo();
  }, []);
  return (
    <section >
      {user.image ? (
        <img
          src={`https://restaurantapi.bssoln.com/images/user/${user.image}`}
          alt=""
        />
      ) : (
        <div className="rounded-lg w-1/6 bg-stone-600 mb-3">
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="white"
            width="100%"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </div>
      )}
      <h1 className="text-xl font-semibold mb-3">Name: {user.fullName}</h1>
      <p className="mb-3">Id: {user.id}</p>
      <p className="mb-3">Email: {user.email}</p>
      <p className="mb-3">Mobile Number: {user.phoneNumber}</p>
    </section>
  );
}
