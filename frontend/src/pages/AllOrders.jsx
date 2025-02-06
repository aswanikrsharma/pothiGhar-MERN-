import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader.jsx";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData.jsx";

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const fetch = async () => {
    const response = await axios.get(
      "https://pothighar-mern-backend.onrender.com/api/get-all-orders",
      { headers }
    );
    setAllOrders(response.data.data);
  };
  useEffect(() => {
    fetch();
  }, []);

  const change = (e) => {
    setValues({ ...Values, status: e.target.value });
  };

  const submitChanges = async (i) => {
    const id = AllOrders[i]._id;
    const response = await axios.put(
      `https://pothighar-mern-backend.onrender.com/api/update-order-status`,
      { Values: Values, id: id},
      { headers }
    );
    alert(response.data.message);
    fetch();
  };

  // AllOrders && AllOrders.splice(AllOrders.length - 1, 1);
  return (
    <>
      {!AllOrders && (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {AllOrders && AllOrders.length > 0 && (
        <>
          <div className="h-[100%] p-0 md:p-4 text-zinc-100">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
              All Orders
            </h1>
            <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
              <div className="w-[3%]">
                <h1 className="text-center">Sr.</h1>
              </div>
              <div className="w-[40%] md:w-[22%]">
                <h1 className="">Books</h1>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1 className="">Description</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1 className="">Price</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <h1 className="">Status</h1>
              </div>
              <div className="w-[10%] md:w-[5%]">
                <h1 className="">
                  <FaUserLarge />
                </h1>
              </div>
            </div>
            {AllOrders.map((items, i) => {
              console.log({AllOrders});
              return (
              <div
                key={i}
                className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer">
                <div className="w-[3%]">
                  <h1 className="text-center">{i + 1}</h1>
                </div>
                <div className="w-[40%] md:w-[22%]">
                  <Link
                    to={`/book-details/${items?.book?._id}`}
                    className="hover:text-blue-300">
                    {items?.book?.title}
                  </Link>
                </div>
                <div className="w-0 md:w-[45%] hidden md:block">
                  <h1 className="">{items?.book?.description.slice(0, 50)}...</h1>
                </div>
                <div className="w-[17%] md:w-[9%]">
                  <h1 className="">{items?.book?.price}</h1>
                </div>
                <div className="w-[30%] md:w-[16%]">
                  <h1 className="font-semibold">
                    <button
                      className="hover:scale-105 transition-all duration-300"
                      onClick={() => {
                        setOptions(i);
                      }}>
                      {items?.status === "Order Placed" ? (
                        <div className="text-yellow-500">{items?.status}</div>
                      ) : items?.status === "Order Cancelled" ? (
                        <div className="text-red-500">{items?.status}</div>
                      ) : (
                        <div className="text-green-500">{items?.status}</div>
                      )}
                    </button>
                    <div className={`${Options === i ? "flex" : "hidden"}`}>
                      <select
                        name="status"
                        id=""
                        className="bg-gray-800"
                        onChange={change}
                        value={Values.status}>
                        {[
                          "Order Placed",
                          "Order Cancelled",
                          "Order Delivered",
                          "Order Returned",
                          "Out for Delivery",
                        ].map((items, i) => (
                          <option key={i} value={items}>
                            {items}
                          </option>
                        ))}
                      </select>
                      <button
                        className="text-green-500 hover:text-pink-600 mx-2"
                        onClick={() => {
                          setOptions(-1);
                          submitChanges(i);
                        }}>
                        <FaCheck />
                      </button>
                    </div>
                  </h1>
                </div>
                <div className="w-[10%] md:w-[5%]">
                  <button
                    className="text-xl hover:text-orange-500"
                    onClick={() => {
                      setUserDiv("fixed");
                      setUserDivData(items.user);
                    }}>
                    <IoOpenOutline />
                  </button>
                </div>
              </div>
            )})}
          </div>
        </>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setUserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
