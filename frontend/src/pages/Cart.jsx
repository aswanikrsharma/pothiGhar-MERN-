import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://pothighar-mern-backend.onrender.com/api/get-user-cart",
        { headers }
      );
      setCart(response.data.data);
    };
    fetch();
  }, []);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `https://pothighar-mern-backend.onrender.com/api/remove-books-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [cart]);

  const placeorder = async () => {
    try {
      const response = await axios.post(
        "https://pothighar-mern-backend.onrender.com/api/place-order",
        { order: cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" px-12 py-8 h-screen shadow-md">
      {!cart && (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {cart && cart.length === 0 && (
        <h3 className="flex items-center justify-center text-4xl font-semibold text-pink-500">
          Your cart is empty
        </h3>
      )}
      {cart && cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-pink-500 mb-8">
            Your cart
          </h1>
          {cart.map((items, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 shadow-lg justify-between items-center"
              key={i}>
              <img
                src={items.url}
                alt="/"
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-black font-semibold text-start mt-2 md:mt-0">
                  {items.title}
                </h1>
                <p className="text-normal text-zinc-500 mt-2 hidden lg:block">
                  {items.description.slice(0, 100)}...
                </p>
                <p className="text-normal text-zinc-500 mt-2 hidden md:block lg:hidden">
                  {items.description.slice(0, 65)}...
                </p>
                <p className="text-normal text-zinc-500 mt-2 block md:hidden">
                  {items.description.slice(0, 65)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-black text-3xl font-semibold flex">
                  ₹ {items.price}
                </h2>
                <button
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => deleteItem(items._id)}>
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {cart && cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-200 font-semibold">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{cart.length} books</h2>
              <h2>₹ {Total}</h2>
            </div>
            <div className="w-[100%] mt-3">
              <button
                className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-pink-500 hover:text-white"
                onClick={placeorder}>
                Place your order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
