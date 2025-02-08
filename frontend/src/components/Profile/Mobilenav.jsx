import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Mobilenav = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
      {role === "user" && (
        <div className="w-full flex items-center justify-between mt-4 md:hidden">
          <Link
            to="/profile"
            className="text-black font-semibold w-full  text-center hover:bg-pink-500 hover:text-white rounded transition-all duration-300">
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="font-semibold w-full  text-center hover:bg-pink-500 hover:text-white rounded transition-all duration-300">
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="hover:bg-pink-500 hover:text-white font-semibold w-full text-center rounded transition-all duration-300">
            Setting
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className="w-full flex items-center justify-between mt-4 md:hidden">
          <Link
            to="/profile"
            className="hover:bg-pink-500 hover:text-white font-semibold w-full  text-center rounded transition-all duration-300">
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="hover:bg-pink-500 hover:text-white font-semibold w-full  text-center rounded transition-all duration-300">
            Add Book
          </Link>
        </div>
      )}
    </>
  );
};

export default Mobilenav;
