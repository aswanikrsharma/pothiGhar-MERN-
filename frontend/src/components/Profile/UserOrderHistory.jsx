import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import {Link} from 'react-router-dom';
const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://pothighar-mern-backend.onrender.com/api/get-order-history`,
        { headers }
      );
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);
  return (
    <>
      {!orderHistory && (
        <div className="flex items-center justify-center h-[100%]">
          {" "}
          <Loader />
        </div>
      )}
      {orderHistory && orderHistory.length === 0 && (
        <div>
          <h1 className="text-pink-500">No Order History</h1>
        </div>
      )}
      {
        orderHistory && orderHistory.length > 0 && (
          <div className="h-[1005] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:5xl font-semibold text-pink-500 mb-8">Your order history</h1>
          <div className="mt-4 shadow-md text-black w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="">Books</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="">Mode</h1>
            </div>
          </div>
          {orderHistory.map((items, i) => (
            <div className="text-black shadow-sm w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-50 hover:cursor-pointer">
            <div className="w-[3%]">
              <h1 className="text-center">{i+1}</h1>
            </div>
            <div className="w-[22%]">
              <Link to={`/book-details/${items.book._id}`} className="hover:text-blue-300">{items.book.title}</Link>
            </div>
            <div className="w-[45%]">
              <h1 className="">{items.book.description.slice(0, 50)}...</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="">{items.book.price}</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="font-semibold text-green-500">
                {items.status === "Order Placed" ? (
                  <div className="text-yellow-500">
                    {items.status}
                  </div>
                )
                : items.status === "Order Cancelled" ? (
                  <div className="text-red-500">{items.status}</div>) : (
                    items.status
          )}
              </h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="text-sm text-zinc-400">COD</h1>
            </div>

            </div>
          ))}
          </div>
        )
      }
    </>
  );
};

export default UserOrderHistory;
