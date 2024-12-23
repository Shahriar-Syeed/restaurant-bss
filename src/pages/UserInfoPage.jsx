import { useEffect, useState } from "react";
import defaultUserImage from "../assets/default-user-image.webp";
import apiUrl from "../apiUrl/ApiUrl.jsx";

export default function UserInfoPage() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchInfo = () => {
      const userInfo = sessionStorage.getItem("user");

      setUser(JSON.parse(userInfo));
      console.log(user);
    };
    fetchInfo();
  }, []);
  return (
    <section className="flex gap-3 md:justify-stretch justify-center ">
      <div className="bg-white shadow-lg  rounded-xl w-fit flex flex-col justify-center items-center gap-3 p-4">
        <div className="rounded-xl w-36 overflow-clip">
          <img
            src={user.image === null ? defaultUserImage : `${apiUrl.getImage}${user.image}`}
            alt=""
            className="rounded-lg h-full w-full object-cover "
          />
        </div>

        <h1 className="text-xl font-semibold ">
          <strong>Name:</strong> {user.fullName}
        </h1>
        <p>
          <strong>Id:</strong> {user.id}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Mobile Number:</strong> {user.phoneNumber}
        </p>
      </div>
    </section>
  );
}
